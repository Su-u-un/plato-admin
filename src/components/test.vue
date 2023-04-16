<template>
  <div>
    <el-table :data="tableData" ref="table" @sort-change="handleSortByAge">
      <el-table-column label="年龄">
        <template v-slot="{row}">
          <div>
            {{row.name}}
          </div>
          <div>
            {{row.age}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <el-button type="primary" @click="handleSortByAge">按年龄升序排序</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { name: '999', age: 22, address: '北京' },
        { name: '88', age: 25, address: '上海' },
        { name: '99', age: 18, address: '广州' },
        { name: '6', age: 28, address: '深圳' }
      ]
    };
  },
  methods: {
    handleSortByAge() {
      this.$nextTick(() => {
        this.$refs.table.sort('name','descending')
      });
    }
  }
};
</script>
<!--<template>-->
<!--&lt;!&ndash;  <el-button @click="test">测试端口</el-button>&ndash;&gt;-->
<!--  <div>-->
<!--    <h1>11</h1>-->
<!--    <h1>11</h1>-->
<!--    <el-button @click="sortTest('visitCount_today')">111</el-button>-->
<!--    <div>-->
<!--    <el-table :data="tableData" ref="tableTest" @sort-change="handleSortChange" sortable>-->
<!--      <el-table-column prop="shortLink" label="短链信息" width="160" >-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="longUrl" label="短链接网址" min-width="100"></el-table-column>-->
<!--      <el-table-column-->
<!--        width="180"-->
<!--        sortable>-->
<!--        <template slot="header">-->
<!--          <el-tooltip-->
<!--            effect="dark"-->
<!--            content="选择排序"-->
<!--            placement="top"-->
<!--            :open-delay="2000">-->
<!--            <el-dropdown placement="bottom">-->
<!--            <span class="el-dropdown-link">-->
<!--              访问次数<i class="el-icon-arrow-down el-icon&#45;&#45;right"/>-->
<!--            </span>-->
<!--              <el-dropdown-menu slot="dropdown">-->
<!--                <el-dropdown-item @click.native="sortTest('visitCount_today')">今日访问次数</el-dropdown-item>-->
<!--                <el-dropdown-item @click.native="sortTest('visitCount_total')">累计访问次数</el-dropdown-item>-->
<!--              </el-dropdown-menu>-->
<!--            </el-dropdown>-->
<!--          </el-tooltip>-->
<!--        </template>-->
<!--        <template v-slot="scope">-->
<!--          <div class="today">-->
<!--            <span>今日：{{ scope.row.visitCount_today }}</span>-->
<!--            <span class="total">累计：{{ scope.row.visitCount_total }}</span>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="访问人数" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <div class="today">-->
<!--            <span>今日：{{ scope.row.visitorCount_today }}</span>-->
<!--            <span class="total">累计：{{ scope.row.visitorCount_total }}</span>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="IP数" width="150">-->
<!--        <template slot-scope="scope">-->
<!--          <div class="today">-->
<!--            <span>今日：{{ scope.row.ipCount_today }}</span>-->
<!--            <span class="total">累计：{{ scope.row.ipCount_total }}</span>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--&lt;!&ndash;      <div>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-table :data="tableData" v-loading="loading"  @sort-change="handleSortChange">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-table-column prop="name"  :slot-scope="renderHeader"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-table-column prop="age" label="年龄"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-table-column prop="address" label="地址"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-table>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {getTest} from "../network/test";-->


<!--export default {-->
<!--  name: "test",-->
<!--  data() {-->
<!--    return {-->
<!--      tableData: [-->
<!--        {-->
<!--          shortLink: 'AAA',-->
<!--          longUrl: 'www.xxx.com',-->
<!--          visitCount_today: 150,-->
<!--          visitCount_total: 1000,-->
<!--          visitorCount_today: 50,-->
<!--          visitorCount_total: 300,-->
<!--          ipCount_today: 30,-->
<!--          ipCount_total: 120-->
<!--        },-->
<!--        {-->
<!--          shortLink: 'BBB',-->
<!--          longUrl: 'www.yyy.com',-->
<!--          visitCount_today: 200,-->
<!--          visitCount_total: 800,-->
<!--          visitorCount_today: 40,-->
<!--          visitorCount_total: 250,-->
<!--          ipCount_today: 20,-->
<!--          ipCount_total: 90-->
<!--        },-->
<!--        {-->
<!--          shortLink: 'CCC',-->
<!--          longUrl: 'www.zzz.com',-->
<!--          visitCount_today: 100,-->
<!--          visitCount_total: 500,-->
<!--          visitorCount_today: 30,-->
<!--          visitorCount_total: 200,-->
<!--          ipCount_today: 15,-->
<!--          ipCount_total: 80-->
<!--        }-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    handleSortChange(val){-->
<!--      console.log(val);-->
<!--    },-->
<!--    sortTest(e){-->
<!--      console.log(this.$refs.tableTest.sort(e,'descending'));-->
<!--      this.$refs.tableTest.sort(e,'descending')-->
<!--    },-->
<!--    test(){-->
<!--      getTest().then(res=>{-->
<!--        console.log(res);-->
<!--      }).catch(err=>{-->
<!--        console.log(err);-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--  // data() {-->
<!--  //   return {-->
<!--  //     loading: false,-->
<!--  //     tableData: [-->
<!--  //       { name: '小明', age: 22, address: '北京' },-->
<!--  //       { name: '小红', age: 25, address: '上海' },-->
<!--  //       { name: '小花', age: 18, address: '广州' },-->
<!--  //       { name: '小刚', age: 28, address: '深圳' }-->
<!--  //     ]-->
<!--  //   };-->
<!--  // },-->
<!--  // methods: {-->
<!--  //   renderHeader(h, { column }) {-->
<!--  //     return h('div',[-->
<!--  //         h('span', column.label)])-->
<!--  //       // <div>-->
<!--  //       //   {column.label}-->
<!--  //       //   <span class="el-table__sort-icon" style={{ marginRight: '8px' }}>-->
<!--  //       //     <i class="sort-arrow el-icon-arrow-up" onClick={() => this.handleSort($index, 'asc')}></i>-->
<!--  //       //     <i class="sort-arrow el-icon-arrow-down" onClick={() => this.handleSort($index, 'desc')}></i>-->
<!--  //       //   </span>-->
<!--  //       // </div>-->
<!--  //   },-->
<!--  //   handleSort(index, order) {-->
<!--  //     this.$refs.table.sort(index, order);-->
<!--  //   },-->
<!--  //   handleSortChange(params) {-->
<!--  //     const { order, prop } = params;-->
<!--  //     console.log(`当前排序属性为${prop}，排序方式为${order}`);-->
<!--  //   }-->
<!--  // }-->
<!--}-->
<!--</script>-->

<style scoped>
.sort-arrow {
  font-size: 14px;
  cursor: pointer;
  margin-top: -1px;
  line-height: 1;
}
.today, .total{
display: inline-block;
width: 50px;
}
.total {
  margin-left: 5px;
  color: #9c9c9c;
  font-size: 12px;
}
.el-table th:hover .total {
  display: inline-block;
  cursor: pointer;
  color: #409EFF;
}
.el-table th:hover .total:hover {
  text-decoration: underline;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
