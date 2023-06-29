<template>
  <b-card>
    <template #header>
      <b-row>
        <b-col sm="3">
          <h4 class="mb-0">Quản lý chuyên trang</h4>
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
          <b-button v-b-toggle.collapse-1 variant="primary" class="mt-5"
            >Tạo Tên Chuyên Trang</b-button
          >
        </b-col>
      </b-row>
    </template>
    <b-collapse id="collapse-1" class="mt-2">
      <CreateCate @reload="reloadData" />
    </b-collapse>
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
        >
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(title)="data">
            <span class="tbl-title">{{ data.item.name }}</span>
          </template>
          <template #cell(created_at)="data">
            {{ convertToTime(data.item.created_at) }}
          </template>
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template #cell(action)="data">
            <div class="group-action">
              <!-- <b-button
                class="btn-edit"
                v-b-tooltip.hover
                title="Sửa"
              ></b-button> -->
              <b-button
                class="btn-delete"
                v-b-tooltip.hover
                title="Xóa"
                @click="handleDelete(data.item.id)"
              ></b-button>
            </div>
          </template>
        </b-table>
        <b-pagination
          class="pag-bottom mt-5"
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { AxiosAuth } from "../utils/axios";
import CreateCate from "../components/form/CreateCate.vue";
import qs from "querystring";
export default {
  components: {
    CreateCate,
  },
  data() {
    return {
      isBusy: true,
      fields: [
        { key: "id", label: "ID" },
        { key: "name", label: "Tên chuyên trang" },
        { key: "slug", label: "Slug" },
        { key: "created_at", label: "Time" },
        { key: "action", label: "" },
      ],
      app_id: "20",
      items: [],
      perPage: 10,
      currentPage: 1,
      total: 0,
    };
  },
  mounted() {
    this.handleLoadCate(1, 10);
  },
  methods: {
    reloadData(val) {
      if (val) {
        this.handleLoadCate(1, 10);
      }
    },
    convertToTime(number) {
      let d = new Date(number * 1000);
      return (
        d.getDate() + "/" + parseInt(d.getMonth() + 1) + "/" + d.getFullYear()
      );
    },
    handleLoadCate(page, number) {
      AxiosAuth.post(
        "/api/find-cate",
        qs.stringify({
          app_id: this.app_id,
          current_page: page,
          total_item: number,
        })
      ).then(({ data: res }) => {
        if (res.status) {
          this.items = res.data.list;
          this.total = res.data.pagination.total;
          this.isBusy = false;
        } else {
          this.isBusy = true;
        }
      });
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
          AxiosAuth.post("/api/dell-cate", qs.stringify({ id: id }))
            .then(({ data: res }) => {
              if (res.status) {
                this.$bvToast.toast("Xoá thành công", {
                  title: `Thông báo`,
                  variant: "success",
                  solid: true,
                });
                setTimeout(() => {
                  this.handleLoadCate(1, 10);
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
  },
  watch: {
    currentPage(val) {
      this.handleLoadCate(val, 10);
    },
    app_id(val) {
      this.handleLoadCate(1, 100);
    },
  },
  head: {
    title: "Quản lý Chuyên trang",
  },
};
</script>

<style scoped>
.err-form small.text-muted {
  color: red !important;
}
</style>