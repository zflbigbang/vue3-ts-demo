<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="searchKeyword" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="success" @click="dialogVisible = true">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" title="用户信息" @close="resetForm">
      <el-form :model="currentUser">
        <el-form-item label="性别">
          <el-select v-model="currentUser.sex">
            <el-option label="女" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="currentUser.age" :min="0" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="currentUser.name" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="currentUser.password" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="currentUser.email" type="email"/>
        </el-form-item>
        <el-form-item label="时间币">
          <el-input-number v-model="currentUser.timecoin" :min="0" />
        </el-form-item>

      </el-form>

      <template v-slot:footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </template>
    </el-dialog>
    <el-table :data="selectData.records" border style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="sex" label="性别" :formatter="formatSex" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="timecoin" label="时间币" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-button type="primary" icon="el-icon-edit" @click="startEditUser(scope.row)">修改</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="danger" icon="el-icon-delete" @click="removeUser(scope.row.id)">删除</el-button>
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
import { getUserPage, updateUser, addUser, deleteUser, searchUserPage } from "../request/api";
import { InitData, UserRecord, SelectDataInt } from "../type/user";
// import { UserRecord } from "@/type/user";
export default defineComponent({
  setup() {
    const data = reactive({
      ...new InitData(),
      searchKeyword: '',
      dialogVisible: false,  // 控制新增/编辑框的可见性
      currentUser: createNewUserRecord()  // 存储当前正在编辑的帖子的信息
    });
    onMounted(() => {
      getUser();
    });
    const getUser = () => {
      getUserPage({ current: data.selectData.current, size: data.selectData.size }).then((res) => {
        data.selectData = res.data.data
      });
    };
    const resetForm = () => {
      data.currentUser = createNewUserRecord();  // 重置表单
    };

    const startEditUser = (user: UserRecord) => {
      data.currentUser = { ...user };  // 复制帖子的数据
      data.dialogVisible = true; 
    };

    const saveUser = async () => {
      if (data.currentUser.id) {
        // 如果帖子已经有 ID，那么更新帖子
        await updateUser(data.currentUser);
        await getUser();
        data.dialogVisible = false;  // 关闭对话框
      } else {
        // 如果帖子没有 ID，那么添加帖子
        await addNewUser(data.currentUser);
        await getUser();
        data.dialogVisible = false;  // 关闭对话框
      }
    };

    const addNewUser = (newUser: UserRecord) => {
      addUser(newUser).then((res) => {
        getUser();
      });
    };
    const removeUser = (Id: number) => {
      deleteUser({ id: Id }).then((res) => {
        getUser();
      });
    };
    const currentChange = (page: number) => {
      data.selectData.current = page;
      getUser();
    };
    const sizeChange = (size: number) => {
      data.selectData.size = size;
      getUser();
    };

    const formatSex = (row: any) => {
      return row.sex === 1 ? '男' : '女';
    };

    function createNewUserRecord(): UserRecord {
      return {
        id: 0,
        sex: 0,
        password:'',
        age: 0,
        name: '',
        email: '',
        timecoin:0,
      };
    }

    const onSubmit = () => {
      console.log('searchKeyword:', data.searchKeyword);  // Add this line
      if (data.searchKeyword != null) {
        searchUserPage({ keyword: data.searchKeyword, current: data.selectData.current, size: data.selectData.size })
          .then((res) => {
            if (res.data.code == 1) {
              data.selectData.records = res.data.data.records;
              data.selectData.total = res.data.data.total;
            } else {
              console.log("操作失败");
            }
          });
      } else {
        getUser();
      }
    };
    watch(
      [
        () => data.selectData.current,
        () => data.selectData.size
      ],
      () => {
        getUser();
      }
    );
    return { ...toRefs(data), formatSex,currentChange, sizeChange, onSubmit, addNewUser, startEditUser, removeUser, resetForm, saveUser };
  },
});
</script>




<style scoped></style>