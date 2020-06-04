<template>
	<div class="about">
		<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">生成代码</el-button>
		<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="name" label="字段名">
				<template>
					<el-input placeholder="请输入内容"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="字段描述" show-overflow-tooltip>
				<template>
					<el-input placeholder="请输入内容"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="物理类型">
				<template>
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="字段属性">
				<template>
					<el-input placeholder="请输入内容"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="插入" width="50">
				<template>
					<el-checkbox></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="编辑" width="50">
				<template>
					<el-checkbox></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="列表" width="50">
				<template>
					<el-checkbox></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="查询" width="50">
				<template>
					<el-checkbox></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="查询方式">
				<template>
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="必填" width="50">
				<template>
					<el-checkbox></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="未填警告" >
				<template>
					<el-input placeholder="请输入内容"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="默认值">
				<template>
					<el-input placeholder="请输入内容"></el-input>
				</template>
			</el-table-column>
		</el-table>
		<button>完成</button>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			options: [
				{
					value: '选项1',
					label: '黄金糕'
				},
				{
					value: '选项2',
					label: '双皮奶'
				},
				{
					value: '选项3',
					label: '蚵仔煎'
				},
				{
					value: '选项4',
					label: '龙须面'
				},
				{
					value: '选项5',
					label: '北京烤鸭'
				}
			],
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
		handleEdit() {
			this.$router.push({ path: '/constructionedit' });
		}
	},
	async created() {}
};
</script>

<style></style>
