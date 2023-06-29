<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0 box-total">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Đã xuất bản</span>
            <div class="text-900 font-medium text-xl">
              {{ totalPage + totalArticle }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi pi-eject text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium" v-if="app_id=='20'">Nhật Báo Tuổi Trẻ </span>
        <span class="text-green-500 font-medium" v-if="app_id=='15'">Tuổi Trẻ Cười </span>
        <span class="text-green-500 font-medium" v-if="app_id=='19'">Tuổi Trẻ Cuối Tuần </span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0 box-total">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Trang Báo</span>
            <div class="text-900 font-medium text-xl">Tổng {{ totalPage }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi pi-fw pi-bookmark text-xl"></i>
          </div>
        </div>
        <!-- <span class="text-green-500 font-medium">%52+ </span
        ><span class="text-500">since last week</span> -->
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0 box-total">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Tin bài</span>
            <div class="text-900 font-medium text-xl">
              Tổng {{ totalArticle }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi pi-file text-xl"></i>
          </div>
        </div>
        <!-- <span class="text-green-500 font-medium">520 </span
        ><span class="text-500">newly registered</span> -->
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0 box-total">
        <div class="flex justify-content-between mb-3">
          <div>
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
            <span class="block text-500 font-medium mb-3">Chọn ngày</span>
            <b-form-group label="" class="date-pic">
              <b-input-group>
                <b-form-input
                  id="example-input"
                  class="input-value"
                  v-model="inputdate"
                  type="text"
                  placeholder="DD/MM/YYYY"
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
            </b-form-group>
          </div>
        </div>
        <!-- <span class="text-green-500 font-medium">520 </span
        ><span class="text-500">newly registered</span> -->
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Trang báo đã đăng ngày {{ forday }}</h5>
        <div
          class="p-datatable p-component p-datatable-responsive-scroll"
          data-scrollselectors=".p-datatable-wrapper"
          pv_id_2=""
        >
          <!----><!----><!----><!----><!----><!----><!---->
          <div class="p-datatable-wrapper">
            <b-table
              id="my-table"
              :fields="fields"
              :items="listNewSpaper"
              responsive="sm"
              :busy="isBusy"
              class="mt-3"
              hover
              head-variant="light"
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
            </b-table>
          </div>
          <!---->
          <div class="p-column-resizer-helper" style="display: none"></div>
          <!----><!---->
        </div>
      </div>
      <div class="card" v-show="false">
        <div class="flex align-items-center justify-content-between mb-4">
          <h5>Notifications</h5>
          <div>
            <button
              class="p-button p-component p-button-icon-only p-button-text p-button-plain p-button-rounded"
              type="button"
            >
              <!----><span class="pi pi-ellipsis-v p-button-icon"></span
              ><span class="p-button-label">&nbsp;</span
              ><!----><span class="p-ink"></span>
            </button>
          </div>
        </div>
        <span class="block text-600 font-medium mb-3">TODAY</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
          <li
            class="flex align-items-center py-2 border-bottom-1 surface-border"
          >
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span class="text-900 line-height-3"
              >Richard Jones
              <span class="text-700"
                >has purchased a blue t-shirt for
                <span class="text-blue-500">79$</span></span
              ></span
            >
          </li>
          <li class="flex align-items-center py-2">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-download text-xl text-orange-500"></i>
            </div>
            <span class="text-700 line-height-3"
              >Your request for withdrawal of
              <span class="text-blue-500 font-medium">2500$</span> has been
              initiated.</span
            >
          </li>
        </ul>
        <span class="block text-600 font-medium mb-3">YESTERDAY</span>
        <ul class="p-0 m-0 list-none">
          <li
            class="flex align-items-center py-2 border-bottom-1 surface-border"
          >
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span class="text-900 line-height-3"
              >Keyser Wick
              <span class="text-700"
                >has purchased a black jacket for
                <span class="text-blue-500">59$</span></span
              ></span
            >
          </li>
          <li
            class="flex align-items-center py-2 border-bottom-1 surface-border"
          >
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-question text-xl text-pink-500"></i>
            </div>
            <span class="text-900 line-height-3"
              >Jane Davis
              <span class="text-700"
                >has posted a new questions about your product.</span
              ></span
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Tin tức đã đăng ngày {{ forday }}</h5>
        <div
          class="p-datatable p-component p-datatable-responsive-scroll"
          data-scrollselectors=".p-datatable-wrapper"
          pv_id_2=""
        >
          <!----><!----><!----><!----><!----><!----><!---->
          <div class="p-datatable-wrapper">
            <b-table
              id="my-table"
              :fields="fieldsArticle"
              :items="listArticle"
              responsive="sm"
              :busy="isBusy2"
              class="mt-3"
              hover
              head-variant="light"
            >
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(title)="data">
                <span class="tbl-title">{{ data.item.title }}</span>
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
          </div>
          <!---->
          <div class="p-column-resizer-helper" style="display: none"></div>
          <!----><!---->
        </div>
      </div>
      <div class="card" v-show="false">
        <div class="flex justify-content-between align-items-center mb-5">
          <h5>Best Selling Products</h5>
          <div>
            <button
              class="p-button p-component p-button-icon-only p-button-text p-button-plain p-button-rounded"
              type="button"
            >
              <!----><span class="pi pi-ellipsis-v p-button-icon"></span
              ><span class="p-button-label">&nbsp;</span
              ><!----><span class="p-ink"></span>
            </button>
          </div>
        </div>
        <ul class="list-none p-0 m-0">
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Space T-Shirt</span
              >
              <div class="mt-1 text-600">Clothing</div>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-orange-500 h-full" style="width: 50%"></div>
              </div>
              <span class="text-orange-500 ml-3 font-medium">%50</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Portal Sticker</span
              >
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-cyan-500 h-full" style="width: 16%"></div>
              </div>
              <span class="text-cyan-500 ml-3 font-medium">%16</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Supernova Sticker</span
              >
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-pink-500 h-full" style="width: 67%"></div>
              </div>
              <span class="text-pink-500 ml-3 font-medium">%67</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Wonders Notebook</span
              >
              <div class="mt-1 text-600">Office</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-green-500 h-full" style="width: 35%"></div>
              </div>
              <span class="text-green-500 ml-3 font-medium">%35</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Mat Black Case</span
              >
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-purple-500 h-full" style="width: 75%"></div>
              </div>
              <span class="text-purple-500 ml-3 font-medium">%75</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Robots T-Shirt</span
              >
              <div class="mt-1 text-600">Clothing</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-teal-500 h-full" style="width: 40%"></div>
              </div>
              <span class="text-teal-500 ml-3 font-medium">%40</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getPathMedia } from "../helpers/helpers";
export default {
  data() {
    return {
      inputdate: "",
      isBusy: false,
      isBusy2: false,
      date: "",
      militsecondime: 0,
      forday: "hôm nay",
      timetoday: "",
      app_id: "20",
      fields: [
        { key: "page_number", label: "Số trang" },
        { key: "img", label: "Image" },
        { key: "category", label: "Tên chuyên trang" },
        { key: "published_at", label: "Ngày tạo" },
        { key: "color", label: "Màu sắc" },
      ],
      fieldsArticle: [
        { key: "index", label: "STT" },
        "title",
        { key: "category", label: "Tên chuyên trang" },
        { key: "published_at", label: "Ngày tạo" },
      ],
      items: [],
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
      console.log(ctx);
      if (ctx.selectedDate == null) {
        this.inputdate = ctx.activeFormatted;
        this.militsecondime = ctx.activeDate.getTime() / 1000;
        this.timetoday = ctx.activeFormatted;
      } else {
        this.inputdate = ctx.selectedFormatted;
        if (this.timetoday != ctx.selectedFormatted) {
          this.forday = ctx.selectedFormatted;
        } else {
          this.forday = "hôm nay";
        }
        console.log(ctx.selectedDate.getTime());
        this.militsecondime = ctx.selectedDate.getTime() / 1000;
      }
      this.$store.dispatch("handleLoadNewsSpaper", {
        curent_day: this.militsecondime,
        app_id: this.app_id,
      });
      this.$store.dispatch("handleLoadArticle", {
        curent_day: this.militsecondime,
        app_id: this.app_id,
      });
    },
  },
  watch: {
    app_id(val) {
      this.$store.dispatch("handleLoadNewsSpaper", {
        curent_day: this.militsecondime,
        app_id: val,
      });
      this.$store.dispatch("handleLoadArticle", {
        curent_day: this.militsecondime,
        app_id: val,
      });
    },
  },
  computed: {
    listNewSpaper() {
      return this.$store.state.listNewspaper;
    },
    listArticle() {
      return this.$store.state.listArticle;
    },
    totalPage() {
      return this.$store.state.totalPage;
    },
    totalArticle() {
      return this.$store.state.totalArticle;
    },
  },
};
</script>

<style>
.box-total {
  height: 161px;
}
.date-pic {
  height: 158px;
}
</style>