<template>
  <b-card class="table-card">
    <template #header>
      <b-row>
        <b-col sm="3">
          <h4 class="mb-0 title-card">Quản lý trang báo</h4>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mt-5 label-input err-form" label="">
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
          <template #cell(img)="data">
            <img
              width="52"
              :src="
                data.item.resource.created_at >= 1678813200
                  ? getResize(data.item.resource.path)
                  : getPathMedia(data.item.resource.path)
              "
            />
          </template>
          <template #cell(category)="data">
            {{ data.item.category.name }}
          </template>
          <template #cell(published_at)="data">
            {{ convertToTime(data.item.published_at) }}
          </template>
          <template #cell(color)="data">
            <b-badge variant="danger" v-if="data.item.color == 'red'"
              >Đỏ</b-badge
            >
            <b-badge variant="primary" v-else>Xanh</b-badge>
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
  </b-card>
</template>
  
  <script>
import { NEWSPAPER } from "../helpers/contants";
import { AxiosAuth } from "../utils/axios";
import { getPathMedia } from "../helpers/helpers";
import qs from "querystring";
export default {
  data() {
    return {
      date: "",
      isBusy: true,
      inputdate: "",
      app_id: "20",
      fields: [
        { key: "id", label: "ID" },
        { key: "page_number", label: "Số trang" },
        { key: "img", label: "Image" },
        { key: "category", label: "Tên chuyên trang" },
        { key: "color", label: "Màu sắc" },
        { key: "published_at", label: "Ngày tạo" },
        { key: "author", label: "Người tạo" },
        { key: "action", label: "" },
      ],
      items: [],
      perPage: 100,
      currentPage: 1,
    };
  },
  methods: {
    getPathMedia: getPathMedia,
    getResize(path) {
      const result = path.replace(/(\/[0-9]+?\/)/gm, "$1r_220_");
      return getPathMedia(result);
    },
    convertToTime(number) {
      let d = new Date(number * 1000);
      return (
        d.getDate() + "/" + parseInt(d.getMonth() + 1) + "/" + d.getFullYear()
      );
    },
    onContext(ctx) {
      if (ctx.selectedDate == null) {
        this.inputdate = ctx.activeFormatted;
        this.published_at = ctx.activeDate.getTime() / 1000;
      } else {
        this.inputdate = ctx.selectedFormatted;
        this.published_at = ctx.selectedDate.getTime() / 1000;
      }
      this.handleLoadNews(1, 100);
    },
    handleEdit(id) {
      location.replace("/edit-trang-bao?id=" + id);
    },
    handleDelete(id) {
      this.$swal({
        title: `Xác nhận Xóa ID: ${id}?`,
        text: "Sau khi xóa sẽ không thể khôi phục",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Đồng ý!",
        cancelButtonText: "Không",
        closeOnConfirm: false,
        closeOnCancel: false,
      }).then((result) => {
        if (result.isConfirmed) {
          AxiosAuth.post("/api/dell-newspaper", qs.stringify({ id: id }))
            .then(({ data: res }) => {
              if (res.status) {
                this.$bvToast.toast("Xoá tin bài thành công", {
                  title: `Thông báo`,
                  variant: "success",
                  solid: true,
                });
                setTimeout(() => {
                  this.handleLoadNews(1, 100);
                }, 2000);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$bvToast.toast("Hủy thao tác!", {
            title: `Thông báo`,
            variant: "danger",
            solid: true,
          });
        }
      });
    },
    handleLoadNews(page, number) {
      this.items = [];
      AxiosAuth.post(
        "/api/find-newspaper",
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
      this.handleLoadNews(1, 100);
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  head: {
    title: "Quản lý Trang Báo",
  },
};
</script>
  
  <style scoped>
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