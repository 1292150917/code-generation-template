<template>
	<div class="about">
		<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">生成代码</el-button>
		<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column label="序号" width="120">
				<template slot-scope="scope">
					{{ scope.row.date }}
				</template>
			</el-table-column>
			<el-table-column prop="name" label="表名称" width="120"></el-table-column>
			<el-table-column prop="address" label="表描述" show-overflow-tooltip></el-table-column>
			<el-table-column prop="name" label="实体" width="120"></el-table-column>
			<el-table-column prop="name" label="创建时间" width="120"></el-table-column>
			<el-table-column prop="name" label="更新时间" width="120"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">下载代码</el-button>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看代码</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			multipleSelection: [],
			tableData: [
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}
			]
		};
	},
	methods: {
		handleClick(row) {
			console.log(row);
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleDelete(res) {
			console.log(res);
		},
		handleEdit(){
			this.$router.push({path:"/constructionedit"})
		}
	},
	async created() {}
};
</script>

<style></style>
