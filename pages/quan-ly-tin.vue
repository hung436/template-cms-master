<template>
  <div>
    <b-card class="table-card" v-if="!showEdit">
      <template #header>
        <b-row>
          <b-col sm="3">
            <h4 class="mb-0 title-card">Quản lý tin</h4>
          </b-col>
          <b-col sm="6">
            <b-form-group
              class="mt-5 label-input err-form"
              label=""
            >
              <b-form-radio-group id="radio-group-1" v-model="app_id">
                <b-form-radio
                  value="20"
                  v-b-tooltip.hover
                  title="Nhật Báo Tuổi Trẻ"
                  >Báo Ngày</b-form-radio
                >
                <b-form-radio value="15" v-b-tooltip.hover title="Tuổi Trẻ Cười"
                  >Tuổi Trẻ Cười</b-form-radio
                >
                <b-form-radio
                  value="19"
                  v-b-tooltip.hover
                  title="Tuổi Trẻ Cuối Tuần"
                  >Tuổi Trẻ Cuối Tuần</b-form-radio
                >
              </b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-input-group class="mt-5">
              <b-form-input
                id="example-input"
                class="input-value"
                v-model="inputdate"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-form-datepicker
                  v-model="date"
                  button-only
                  right
                  locale="vi"
                  aria-controls="example-input"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                  @context="onContext"
                ></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </template>
      <b-row>
        <b-col sm="12">
          <b-table
            id="my-table"
            :fields="fields"
            :items="items"
            responsive="sm"
            :busy="isBusy"
            class="mt-3"
            hover
            head-variant="light"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(title)="data">
              <span class="tbl-title">{{
                limitText(data.item.title, 80)
              }}</span>
            </template>
            <template #cell(category)="data">
              {{ data.item.category.name }}
            </template>
            <template #cell(published_at)="data">
              {{ convertToTime(data.item.published_at) }}
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(action)="data">
              <div class="group-action">
                <b-button
                  class="btn-edit"
                  v-b-tooltip.hover
                  title="Sửa"
                  @click="handleEdit(data.item.id)"
                ></b-button>
                <b-button
                  class="btn-delete"
                  v-b-tooltip.hover
                  title="Xóa"
                  @click="handleDelete(data.item.id)"
                ></b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <!-- <b-pagination
      class="pag-bottom mt-5"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination> -->
      <!-- <b-modal v-model="showEdit" size="xl" id="md-edit" title="Edit tin bài" :hide-footer="true">
      <ArticleBox :detail="detail" :titlebox="'Edit tin bài'"/>
      <hr/>
    </b-modal> -->
    </b-card>
    <b-card class="table-card" v-else>
      <template #header>
        <b-row>
          <b-col sm="9">
            <h4 class="mb-0 title-card">Edit tin bài</h4>
          </b-col>
        </b-row>
      </template>
      <b-row>
        <b-col sm="12">
          <ArticleBox :detail="detail" :titlebox="'Edit tin bài'" />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
  
  <script>
import { AxiosAuth } from "../utils/axios";
import ArticleBox from "../components/form/ArticleBox.vue";
import qs from "querystring";
export default {
  components: {
    ArticleBox,
  },
  data() {
    return {
      date: "",
      isBusy: true,
      published_at: 0,
      inputdate: 0,
      showEdit: false,
      detail: {},
      app_id: "20",
      fields: [
        { key: "index", label: "STT" },
        { key: "title", label: "Tiêu đề" },
        { key: "category", label: "Tên chuyên trang" },
        { key: "page_number", label: "Số trang" },
        { key: "author", label: "Người tạo" },
        { key: "published_at", label: "Ngày tạo" },
        { key: "author", label: "Người sửa" },
        { key: "action", label: "" },
      ],
      items: [],
      perPage: 100,
      currentPage: 1,
    };
  },
  mounted() {
    // this.handleLoadArticle(1,10);
  },
  methods: {
    limitText(text, count) {
      return text.slice(0, count) + (text.length > count ? "..." : "");
    },
    convertToTime(number) {
      let d = new Date(number * 1000);
      return (
        d.getDate() + "/" + parseInt(d.getMonth() + 1) + "/" + d.getFullYear()
      );
    },
    onContext(ctx) {
      console.log(ctx);
      if (ctx.selectedDate == null) {
        this.inputdate = ctx.activeFormatted;
        this.published_at = ctx.activeDate.getTime() / 1000;
      } else {
        this.inputdate = ctx.selectedFormatted;
        this.published_at = ctx.selectedDate.getTime() / 1000;
      }
      this.handleLoadArticle(1, 100);
    },
    handleDelete(id) {
      AxiosAuth.post("/api/dell-article", qs.stringify({ id: id }))
        .then(({ data: res }) => {
          if (res.status) {
            this.$bvToast.toast("Xoá tin bài thành công", {
              title: `Thông báo`,
              variant: "success",
              solid: true,
            });
            setTimeout(() => {
              this.handleLoadArticle(1, 100);
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(id) {
      AxiosAuth.get(`/api/find-article-by-id?id=${id}`).then(
        ({ data: res }) => {
          if (res.status) {
            console.log(res.data[0]);
            this.detail = res.data[0];
            this.showEdit = true;
          } else {
            this.$bvToast.toast("Load tin bài thất bại", {
              title: `Thông báo`,
              variant: "danger",
              solid: true,
            });
          }
        }
      );
    },
    handleLoadArticle(page, number) {
      this.items = [];
      AxiosAuth.post(
        "/api/find-article",
        qs.stringify({
          app_id: this.app_id,
          published_at: this.published_at,
          current_page: page,
          total_item: number,
        })
      ).then(({ data: res }) => {
        if (res.status) {
          let list = [];
          let data = res.data.list;
          if (data.length > 0) {
            data.map((v, k) => {
              if (v.status == 1) {
                list.push(v);
              }
            });
          }
          this.items = list;
          this.isBusy = false;
        } else {
          this.isBusy = true;
        }
      });
    },
  },
  watch: {
    app_id(val) {
      this.handleLoadArticle(1, 100);
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  head: {
    title: "Quản lý tin",
  },
};
</script>
  
<style scoped>
.tbl-title {
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #464e5f;
}
.group-action {
  display: flex;
}
.pag-bottom {
  justify-content: center;
}
.btn {
  border-radius: 7px;
}
.btn:hover {
  border: 1px solid #6993ff;
}
</style>