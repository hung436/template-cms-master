<template>
  <b-card class="table-card">
    <template #header>
      <b-row>
        <b-col sm="12">
          <h4 class="mb-0 title-card">Nhập trang báo</h4>
        </b-col>
      </b-row>
    </template>
    <b-row>
      <b-col sm="12">
        <!-- BOX -->
        <div class="form-input">
          <b-form-group
            id="fieldset-chose"
            content-cols-lg="7"
            label="Chọn loại báo"
          >
            <b-form-select
              class="input-value"
              v-model="newsType"
              :options="newsTypeSelect"
            ></b-form-select>
          </b-form-group>

          <b-form-group content-cols-lg="7" label="Chọn Ngày">
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

          <b-form-group content-cols-lg="7" label="Chọn màu">
            <b-form-select
              class="input-value"
              v-model="color"
              :options="options"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            content-cols-lg="7"
            label="Tên chuyên trang"
            class="label-input err-form"
            :description="errSpecailized"
          >
            <inputSearch @select-event="inputSelected" />
          </b-form-group>

          <b-form-group
            content-cols-lg="7"
            label="Số trang"
            class="label-input err-form"
            :description="errNumberPage"
          >
            <b-form-input
              type="number"
              class="input-value"
              v-model="numberPage"
              @change="onChangePage"
              placeholder=""
            ></b-form-input>
          </b-form-group>

          <b-form-group
            v-if="ishowthumb"
            content-cols-lg="7"
            label="Ảnh dại diện"
            class="mt-1 label-input err-form"
            :description="err_avatar"
          >
            <div
              class="review-img text-center"
              @click="$refs.image_map_res.ShowResources"
            >
              <img
                :style="ishowthumb != true ? 'width:100%' : ''"
                :src="avatar"
              />
              <p v-show="!ishowthumb">Chọn thumbnail</p>
            </div>
          </b-form-group>

          <b-form-group
            v-if="ishowthumb"
            content-cols-lg="7"
            class="mt-1 label-input err-form"
            label="Chọn File Download"
            :description="err_file_zip"
          >
            <b-input-group style="flex-wrap: inherit">
              <b-input-group-prepend
                v-b-tooltip.hover
                title="Chọn File Download"
                @click="$refs.image_map_res.ShowResources"
              >
                <span class="input-group-text">
                  <i class="pi pi-cloud-download"></i
                ></span>
              </b-input-group-prepend>
              <b-form-input
                disabled
                type="text"
                v-model="file_zip_name"
                class="input-value"
                placeholder="File nén cho phép người dùng tải về"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group
            content-cols-lg="7"
            label="Số Báo"
            class="label-input err-form"
            :description="errIssue"
          >
            <b-form-input
              type="text"
              class="input-value"
              v-model="Issue"
              placeholder="Nhập số báo vd: 255/2022 (10576)"
            ></b-form-input>
          </b-form-group>
          <b-alert show variant="primary"
            >Chú ý: Để tự động đổ dữ liệu cần thực hiện theo thứ tự 1:Chọn loại
            báo, 2:Nhập số báo, 3:Chọn ngày</b-alert
          >
        </div>
        <!-- END BOX -->
        <imageMap
          @some-event="setFile"
          @some-thumb="setThumb"
          @some-download="setDownload"
          :time="militsecondime"
          ref="image_map_res"
        />
      </b-col>
    </b-row>
    <template #footer>
      <div class="group-btn-2">
        <b-button class="btn" variant="light" @click="handleResetForm"
          >Xóa</b-button
        >
        <b-button class="btn btn-blue" @click="handleSubmit"
          >Hoàn thành</b-button
        >
      </div>
    </template>
  </b-card>
</template>

<script>
import imageMap from "../../components/form/imageMap.vue";
import inputSearch from "../../components/form/inputSearch.vue";
import qs from "querystring";
import { AxiosAuth } from "../../utils/axios";
import { getPathMedia } from "../../helpers/helpers";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  components: {
    imageMap,
    inputSearch,
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("Bạn có muốn thoát khỏi page hiện tại?");
    if (answer) {
      next();
    } else {
      next(false);
    }
    s;
  },
  mounted() {
    console.log(Cookie.get("auto_fill"));
    if (Cookie.get("auto_fill") != undefined) {
      let fill_data = JSON.parse(Cookie.get("auto_fill"));
      this.newsType = fill_data.type;
      this.Issue = fill_data.issue;
      let _this = this;
      setTimeout(() => {
        let d = new Date(fill_data.time * 1000);
        _this.inputdate =
          d.getDate() +
          "/" +
          parseInt(d.getMonth() + 1) +
          "/" +
          d.getFullYear();
      }, 2000);
    }
  },
  data() {
    return {
      inputdate: "",
      date: "",
      militsecondime: 0,
      errNumberPage: "",
      issetNumpage: false,
      numberPage: 0,
      color: "red",
      file: null,
      options: [
        { value: "red", text: "Đỏ" },
        { value: "blue", text: "xanh" },
      ],
      errSpecailized: "",
      specailized: 0,
      newsType: "20",
      newsTypeSelect: [
        { value: "20", text: "Báo ngày" },
        { value: "15", text: "Tuổi Trẻ Cười" },
        { value: "19", text: "Tuổi Trẻ Cuối Tuần" },
      ],
      errIssue: "",
      Issue: "",
      ishowthumb: false,
      file_avatar: {},
      err_avatar: "",
      avatar: "/img/Upload_duotone.svg",
      file_zip: {},
      file_zip_name: "",
      err_file_zip: "",
    };
  },
  methods: {
    inputSelected(e) {
      this.specailized = e;
    },
    setFile(e) {
      console.log(e);
      this.file = e[0];
    },
    setThumb(e) {
      if (e[0]) {
        this.avatar = getPathMedia(e[0].path);
        console.log(e[0]);
        this.file_avatar = e[0];
      }
    },
    setDownload(e) {
      if (e[0]) {
        this.file_zip = e[0];
        this.file_zip_name = this.file_zip.name;
      }
    },
    validateFormCountErr() {
      this.errNumberPage =
        this.numberPage == 0 ||
        this.numberPage > 100 ||
        this.issetNumpage == true
          ? "Số trang đã tồn tại"
          : "";

      // this.errNumberPage = this.numberPage == 0 ? "Chưa nhập số trang báo" : "";
      this.errSpecailized =
        this.specailized == 0 ? "Chưa nhập Tên chuyên trang" : "";
      this.errIssue = this.Issue.length == 0 ? "Chưa nhập Số báo" : "";
      let hasErrString =
        this.errNumberPage.length +
        this.errSpecailized.length +
        this.errIssue.length;
      return hasErrString;
    },
    handleResetForm() {
      location.reload();
    },
    onChangePage(val) {
      this.$store.dispatch("handleLoadNewsSpaper", {
        curent_day: this.militsecondime,
        app_id: this.newsType,
      });
      setTimeout(() => {
        let listPageToday = this.$store.state.listPageToday;
        this.$router.push("#page-" + val);
        if (listPageToday.includes(parseInt(val))) {
          this.ishowthumb = false;
          this.$bvToast.toast("Số trang đã tồn tại!", {
            title: `Thông báo`,
            variant: "danger",
            solid: true,
          });
          this.issetNumpage = true;
        } else {
          if (val == 1) {
            this.ishowthumb = true;
          } else {
            this.ishowthumb = false;
          }
          this.issetNumpage = false;
        }
      }, 1000);
    },
    handleSubmit() {
      let tottalErr = this.validateFormCountErr();
      let img = $(".image-mapper-img").attr("data-url");
      if (img == undefined || this.file == null) {
        this.$bvToast.toast("Chưa chọn hình ảnh trên trang", {
          title: `Thông báo`,
          variant: "warning",
          solid: true,
        });
        return;
      }
      if (this.numberPage == 1) {
        if (this.file_zip_name.length == 0) {
          this.err_file_zip = "hãy chọn file download";
          tottalErr += 1;
        } else {
          this.err_file_zip = "";
          tottalErr -= 1;
        }
      }
      if (tottalErr > 0) {
        this.$bvToast.toast("Hãy nhập vào các thông tin cần thiết", {
          title: `Thông báo`,
          variant: "warning",
          solid: true,
        });
        return;
      }
      let codehtml = $("#image-mapper-body").html();
      // let codehtml = $("#image-map").imageMapper("asHTML");
      let codeSvg = $(".image-mapper-svg").html();
      var db = $("#image-map").imageMapper("getData");
      let obj = {};
      let area = [];
      $("#hiddenCode")
        .find("area")
        .each(function (index, e) {
          let idx = $(this).attr("data-index");
          let alt = $(this).attr("alt");
          let title = $(this).attr("title");
          let href = $(this).attr("href");
          let coords = $(this).attr("coords");
          let shape = $(this).attr("shape");
          let target = $(this).attr("target");
          let link_page = $(this).attr("linkpage");
          area[index] = {
            idx: idx,
            title: title,
            alt: alt,
            href: href,
            coords: coords,
            shape: shape,
            link_page: link_page,
            target: target,
          };
        });
      // obj.img = img;

      obj.map = area;
      obj.html = JSON.stringify(db);
      obj.html_svg = codeSvg;
      let res = {
        resource_type: this.file.type,
        resource_name: this.file.name,
        resource_path: this.file.path,
        resource_extension: this.file.extension,
      };
      let thumb = {
        thumbnail_type: this.file_avatar.type || "",
        thumbnail_name: this.file_avatar.name || "",
        thumbnail_path: this.file_avatar.path || "",
        thumbnail_extension: this.file_avatar.extension || "",
      };
      let zip_file = {
        file_type: "file",
        file_name: this.file_zip.name || "",
        file_path: this.file_zip.path || "",
        file_extension: this.file_zip.extension || "",
      };
      let data = {
        resource_type: this.file.type,
        resource_name: this.file.name,
        resource_path: this.file.path,
        resource_extension: this.file.extension,
        resource: JSON.stringify(res),
        thumbnail: JSON.stringify(thumb),
        file: JSON.stringify(zip_file),
        raw_height: $(".image-mapper-img").prop("naturalHeight"),
        raw_width: $(".image-mapper-img").prop("naturalWidth"),
        page_number: this.numberPage,
        type: this.newsType,
        issue: this.Issue,
        published_at: this.militsecondime,
        category_id: this.specailized,
        color: this.color,
        map: JSON.stringify(obj),
        app_id: this.newsType,
      };
      console.log("map", data);
      AxiosAuth.post(`/api/create-newspaper`, qs.stringify(data))
        .then(({ data: res }) => {
          if (res.status) {
            this.$bvToast.toast("Đăng tin thành công !", {
              title: `Thông báo`,
              variant: "success",
              solid: true,
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            this.$bvToast.toast(
              `Có lỗi trong quá trình đăng tin,${res.message}!`,
              {
                title: `Thông báo`,
                variant: "danger",
                solid: true,
              }
            );
          }
        })
        .catch((err) => {});
      console.log(data);
    },
    onContext(ctx) {
      console.log(ctx);
      if (ctx.selectedDate == null) {
        this.inputdate = ctx.activeFormatted;
        this.militsecondime = ctx.activeDate.getTime() / 1000;
      } else {
        this.inputdate = ctx.selectedFormatted;
        this.militsecondime = ctx.selectedDate.getTime() / 1000;
      }
    },
  },
  watch: {
    specailized(val) {
      console.log(val);
    },
    militsecondime(val) {
      console.log(val);
      let info = {
        type: this.newsType,
        time: val,
        issue: this.Issue,
      };
      Cookie.set("auto_fill", JSON.stringify(info), { expires: 1 });
      this.$store.dispatch("handleLoadNewsSpaper", {
        curent_day: val,
        app_id: this.$store.state.app_id,
      });
    },
    newsType(val) {
      this.$store.commit("setAppID", val);
    },
  },
  head: {
    title: "Nhập Trang Báo",
    link: [
      {
        rel: "stylesheet",
        href: "/tooling/css/app.min.css",
      },
    ],
    script: [
      { src: "/tooling/js/app.min.js", type: "text/javascript" },
      { src: "/tooling/js/beacon.min.js", type: "text/javascript" },
    ],
  },
};
</script>

<style scoped>
.group-btn-2 {
  float: right;
}
.form-input .input-value {
  font-family: "Mulish";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #5e6278;
  background-color: #f5f8fa;
}
@media only screen and (min-width: 1200px) {
  .form-input {
    padding-left: 22rem;
    padding-right: 22rem;
  }
}
.label-input {
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #3f4254;
}
.input-value {
  background: #f3f6f9;
  border-radius: 4px;
}
</style>

<style>
.err-form small.text-muted {
  color: red !important;
}
</style>
