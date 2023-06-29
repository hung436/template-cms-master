<template>
  <div>
    <b-input-group style="flex-wrap: inherit">
      <b-input-group-prepend
        v-b-tooltip.hover
        title="Tạo chuyên trang"
        @click="handleShowCate"
      >
        <span class="input-group-text">
          <i class="pi pi-external-link"></i
        ></span>
      </b-input-group-prepend>
      <no-ssr>
        <v-select
          style="width: 100%"
          v-model="specailized"
          multiple
          :placeholder="title_input"
          label="title"
          :options="listData"
          taggable
          :map-keydown="handlers"
          :selectable="() => specailized.length < 1"
          @input="setSelected"
          :filterable="false"
          @search="onSearch"
        >
        </v-select>
      </no-ssr>
    </b-input-group>
    <!-- <b-pagination
      v-model="currentPage"
      :total-rows="total"
      :per-page="perPage"
      size="sm"
    ></b-pagination> -->
    <b-modal
      v-model="showCat"
      id="md-category"
      title="Tạo chuyên trang"
      :hide-footer="true"
    >
      <CreateCate :onlyCreateCate="true" @reload="reloadData" />
      <hr />
    </b-modal>
  </div>
</template>

<script>
import { AxiosAuth } from "../../utils/axios";
import CreateCate from "../../components/form/CreateCate.vue";
import qs from "querystring";
export default {
  components: {
    CreateCate,
  },
  props: {
    selectedCat: {
      type: Object,
    },
  },
  data() {
    return {
      specailized: [],
      listData: [],
      showCat: false,
      perPage: 50,
      currentPage: 1,
      total: 0,
      title_input: "Nhập hoặc xóa để làm mới!",
    };
  },
  mounted() {
    setTimeout(() => {
     this.loadListCate(1, 50);
    }, 2000);
    if (this.selectedCat) {
      this.specailized.push(this.selectedCat);
    }
  },
  methods: {
    onSearch(search, loading) {
        loading(true);
        AxiosAuth.post(
          "/api/find-cate",
          qs.stringify({
            app_id: this.$store.state.app_id,
            name: search,
            current_page: 1,
            total_item: 100,
          })
        ).then(({ data: res }) => {
          if (res.status) {
            let arr = [];
            res.data.list.map((v, k) => {
              arr.push({ id: v.id, title: v.name });
            });
            this.listData = arr;
            this.total = res.data.pagination.total;
            loading(false);
          }
        });
    },

    setSelected(val) {
      if (val.length > 0 && val[0].id) {
        this.$emit("select-event", val[0].id);
      } else {
        this.specailized = [];
        this.$bvToast.toast("Hãy chọn tên gợi ý Chuyên trang đầy đủ hơn!", {
          title: `Thông báo`,
          variant: "danger",
          solid: true,
        });
      }
    },
    reloadData(val) {
      if (val) {
        this.loadListCate(1, 50);
        this.showCat = false;
      }
    },
    handleShowCate() {
      this.showCat = true;
    },
    handlers: (map, vm) => ({
      ...map,
      13: (e) => {
        e.preventDefault();
        return vm.typeAheadSelect();
      },
    }),
    handleLoadmore() {},
    loadListCate(page, number) {
      console.log(this.$store.state.app_id)
      AxiosAuth.post(
        "/api/find-cate",
        qs.stringify({
          app_id: this.$store.state.app_id,
          current_page: page,
          total_item: number,
        })
      )
        .then(({ data: res }) => {
          if (res.status) {
            let arr = [];
            res.data.list.map((v, k) => {
              arr.push({ id: v.id, title: v.name });
            });
            this.listData = arr;
            this.total = res.data.pagination.total;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    specailized(val) {
      if (val.length == 0) {
        this.loadListCate(1, 50);
      }
    },
    currentPage(val) {
      this.title_input = "Loading...";
      this.loadListCate(val, 50);
      setTimeout(() => {
        this.title_input = "Nhập hoặc xóa để làm mới";
      }, 1000);
    },
  },
};
</script>

<style>
</style>