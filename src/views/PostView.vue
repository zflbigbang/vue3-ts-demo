<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="详情">
          <el-input v-model="searchKeyword" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="success" @click="dialogVisible = true">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" title="帖子信息" @close="resetForm">
      <el-form :model="currentPost">
        <el-form-item label="开始时间">
          <el-date-picker v-model="currentPost.starttime" type="datetime" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input-number v-model="currentPost.userId" :min="0" />
        </el-form-item>
        <el-form-item label="通过状态">
          <el-select v-model="currentPost.ispass">
            <el-option label="未通过" :value="0"></el-option>
            <el-option label="通过" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进行状态">
          <el-select v-model="currentPost.isend">
            <el-option label="未进行" :value="0"></el-option>
            <el-option label="进行中" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间币">
          <el-input-number v-model="currentPost.timecoin" :min="0" />
        </el-form-item>
        <el-form-item label="志愿者ID">
          <el-input-number v-model="currentPost.volunteers" :min="0" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input type="textarea" :rows="5" v-model="currentPost.content" />
        </el-form-item>
      </el-form>

      <template v-slot:footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="savePost">保存</el-button>
      </template>
    </el-dialog>
    <el-table :data="selectData.records" border style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="starttime" label="开始时间" width="180" :formatter="formatDate" />
      <el-table-column prop="userId" label="用户ID" />
      <el-table-column prop="ispass" label="通过状态" :formatter="formatPassStatus" />
      <el-table-column prop="isend" label="进行状态" :formatter="formatEndStatus" />
      <el-table-column prop="timecoin" label="时间币" />
      <el-table-column prop="volunteers" label="志愿者ID" />
      <el-table-column prop="content" label="详情" width="180" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-button type="primary" icon="el-icon-edit" @click="startEditPost(scope.row)">修改</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="danger" icon="el-icon-delete" @click="removePost(scope.row.id)">删除</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="currentChange" @size-change="sizeChange" layout="prev, pager, next"
      :total="selectData.total" />
  </div>
</template>




<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import { getPostPage, searchPostPage, addPost, updatePost, deletePost } from "../request/api";
import { InitData, PostRecord, SelectDataInt } from "../type/post";
import { ApiResponse } from "../type/api";
import { format } from 'date-fns';
export default defineComponent({
  setup() {
    const data = reactive({
      ...new InitData(),
      searchKeyword: '',
      dialogVisible: false,  // 控制新增/编辑框的可见性
      currentPost: createNewPostRecord()  // 存储当前正在编辑的帖子的信息
    });
    onMounted(() => {
      getPost();
    });
    const getPost = () => {
      getPostPage({ current: data.selectData.current, size: data.selectData.size }).then((res) => {
        data.selectData = res.data.data
      });
    };
    const resetForm = () => {
      data.currentPost = createNewPostRecord();  // 重置表单
    };

    const startEditPost = (post: PostRecord) => {
      data.currentPost = { ...post };  // 复制帖子的数据
      data.dialogVisible = true; 
    };

    const savePost = async () => {
      if (data.currentPost.id) {
        // 如果帖子已经有 ID，那么更新帖子
        await updatePost(data.currentPost);
        await getPost();
        data.dialogVisible = false;  // 关闭对话框
      } else {
        // 如果帖子没有 ID，那么添加帖子
        await addNewPost(data.currentPost);
        await getPost();
        data.dialogVisible = false;  // 关闭对话框
      }
    };
    const formatPassStatus = (row: any) => {
      return row.ispass === 1 ? '通过' : '未通过';
    };

    const formatEndStatus = (row: any) => {
      return row.isend === 1 ? '结束' : '进行中';
    };

    const addNewPost = (newPost: PostRecord) => {
      addPost(newPost).then((res) => {
        getPost();
      });
    };
    const removePost = (postId: number) => {
      deletePost({ id: postId }).then((res) => {
        getPost();
      });
    };
    const currentChange = (page: number) => {
      data.selectData.current = page;
      getPost();
    };
    const sizeChange = (size: number) => {
      data.selectData.size = size;
      getPost();
    };
    function createNewPostRecord(): PostRecord {
      return {
        id: 0,
        starttime: '',
        userId: 0,
        ispass: 0,
        isend: 0,
        timecoin: 0,
        volunteers: 0,
        content: '',
      };
    }
    const formatDate = (row: any) => {
      let date = new Date(row.starttime);
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    };
    const onSubmit = () => {
      console.log('searchKeyword:', data.searchKeyword);  // Add this line
      if (data.searchKeyword != null) {
        searchPostPage({ keyword: data.searchKeyword, current: data.selectData.current, size: data.selectData.size })
          .then((res) => {
            if (res.data.code == 1) {
              data.selectData.records = res.data.data.records;
              data.selectData.total = res.data.data.total;
            } else {
              console.log("操作失败");
            }
          });
      } else {
        getPost();
      }
    };
    watch(
      [
        () => data.selectData.current,
        () => data.selectData.size
      ],
      () => {
        getPost();
      }
    );
    return { ...toRefs(data), formatPassStatus, formatEndStatus, formatDate, currentChange, sizeChange, onSubmit, addNewPost, startEditPost, removePost, resetForm, savePost };
  },
});
</script>




<style scoped></style>