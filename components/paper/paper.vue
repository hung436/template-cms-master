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
            <inputSearch
              v-if="specailizedID"
              @select-event="inputSelected"
              :selectedCat="specailizedID"
            />
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
            <div class="review-img text-center" @click="showMedia = true">
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
                @click="showMedia = true"
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
        </div>
        <!-- END BOX -->
        <b-skeleton-table
          v-show="file == ''"
          :rows="5"
          :columns="4"
          :table-props="{ bordered: true, striped: true }"
        ></b-skeleton-table>
        <div v-show="file">
          <div class="step">
            <button
              type="button"
              class="btn btn-lg mr-2"
              id="image-mapper-upload"
              @click="handleClickUpload"
            >
              Chọn hình ảnh
            </button>
            <b-form-file
              ref="browFileInput"
              accept="image/jpeg, image/png"
              @change="handleChangeFile"
              v-show="false"
              v-model="browFile"
              plain
            ></b-form-file>
            <button
              type="button"
              class="btn btn-lg"
              id="image-mapper-upload"
              @click="ShowResources"
            >
              <i class="pi pi-image"></i>
              Chọn từ Resources
            </button>
            <b-toast id="my-toast" variant="warning" solid>
              <template #toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                  <b-img
                    blank
                    blank-color="#ff5555"
                    class="mr-2"
                    width="12"
                    height="12"
                  ></b-img>
                  <strong class="mr-auto">Đang tải lên!</strong>
                </div>
              </template>
              <div class="mt-3" v-show="proval > 0">
                <b>
                  <b-badge variant="primary">Size</b-badge> :
                  {{ `${curSize.size} ${curSize.type}` }} /
                  {{ `${totalSize.size} ${totalSize.type}` }}</b
                >
                <b-progress :max="100" class="mb-3 mt-1">
                  <b-progress-bar
                    :value="proval"
                    :label="`${((proval / 100) * 100).toFixed(2)}%`"
                  ></b-progress-bar>
                </b-progress>
              </div>
            </b-toast>
          </div>
          <div class="container toggle-content" v-show="showReview">
            <div id="image-map-wrapper" class="mt-5 mb-5">
              <div id="image-map-container">
                <div
                  id="image-map"
                  style="max-width: 100%"
                  class="image-mapper"
                >
                  <img class="image-mapper-img" src="" />
                  <svg class="image-mapper-svg" style="width: 100%"></svg>
                </div>
              </div>
            </div>
            <table class="table" id="image-mapper-table">
              <thead>
                <tr>
                  <th>Chọn</th>
                  <th>Khung</th>
                  <th>Link</th>
                  <th>Kiểu Link</th>
                  <th>Tiêu đề</th>
                  <th>Thao tác</th>
                  <th style="width: 25px">
                    <i
                      v-b-tooltip.hover
                      title="Đóng Ghim"
                      class="pi pi-angle-down togle-down"
                      style="display: none"
                    ></i>
                    <i
                      v-b-tooltip.hover
                      title="Mở Ghim"
                      class="pi pi-chevron-up togle-fixed"
                    ></i>
                  </th>
                </tr>
              </thead>
              <tbody id="image-mapper-body">
                <tr>
                  <td style="width: 65px">
                    <div class="control-label input-sm pt-2">
                      <input type="radio" name="im[0][active]" value="1" />
                    </div>
                  </td>
                  <td>
                    <select name="im[0][shape]" class="form-control input-sm">
                      <option value="rect">🔲Khung chữ nhật</option>
                      <option value="poly">✡️Khung đa giác</option>
                      <option value="circle">🔴Khung tròn</option>
                    </select>
                  </td>
                  <td class="select-link">
                    <input
                      type="text"
                      name="im[0][href]"
                      value=""
                      disabled
                      placeholder="Nhập link có sẵn vào đây"
                      class="form-control input-sm"
                    />
                  </td>
                  <td>
                    <select
                      name="im[0][linkpage]"
                      class="form-control input-sm select-page"
                    >
                      <option value="0">Nhập tay</option>
                      <option value="1">Link Trang</option>
                      <option value="2">Link bài viết</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="im[0][title]"
                      value=""
                      placeholder="Title"
                      class="form-control input-sm"
                    />
                  </td>
                  <td>
                    <select name="im[0][target]" class="form-control input-sm">
                      <option value="">---</option>
                      <option value="_blank">Mở tab mới</option>
                      <!-- <option value="_parent">_parent</option>
                      <option value="_self">_self</option>
                      <option value="_top">_top</option> -->
                    </select>
                  </td>
                  <td>
                    <button
                      class="btn-delete"
                      v-b-tooltip.hover
                      title="Xóa"
                      name="im[0][remove]"
                    ></button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="6" style="text-align: right">
                    <button type="button" class="btn btn-danger btn-sm add-row">
                      <span class="glyphicon glyphicon-plus"></span> Thêm
                    </button>
                    <b-button
                      v-show="false"
                      class="btn-sm"
                      variant="success"
                      @click="HandleClick(true)"
                      >Show Code</b-button
                    >
                    <button
                      class="ml-2 btn btn-info btn-sm"
                      @click="handlePageReview"
                    >
                      Review
                    </button>
                    <b-spinner
                      small
                      label="Small Spinner"
                      type="grow"
                      v-show="autoSave"
                      variant="primary"
                      v-b-tooltip.hover
                      title="Auto Save"
                    ></b-spinner>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="result"></div>
          <div id="hiddenCode"></div>
          <b-modal
            v-model="modalShow"
            :hide-footer="true"
            size="xl"
            title="Review Code"
          >
            <div class="text-right"></div>
            <b-badge pill variant="warning">Html</b-badge>
            <pre>
        <code id="Tagcodehtml" v-highlight class="html">{{ Codetext }}</code>
      </pre>
            <b-badge pill variant="warning">JSON data</b-badge>
            <pre>
        <code id="TagcodeJson" v-highlight class="json" style="color: chartreuse;">{{ codeJson }}</code>
      </pre>
            <b-badge pill variant="warning">Html Svg</b-badge>
            <pre>
        <code id="TagcodeSvg" v-highlight class="html">{{ codeSvg }}</code>
      </pre>
          </b-modal>
          <b-modal
            v-model="showMedia"
            size="xl"
            id="md-resources"
            title="Resources"
            :hide-footer="true"
          >
            <FileManager
              @sending-insert="InsertMedia"
              @sending-thumb-trang-bao="InserThumbTrangBao"
              @sending-setDownload="setDownload"
              :showSetThumb="false"
              :imgType="img_type"
              :maxImgFile="1"
            />
          </b-modal>
          <b-modal
            v-model="reviewPage"
            size="xl"
            id="md-review"
            title="Page review"
          >
            <iframe
              src="/review-page"
              width="1300"
              height="600"
              style="border: 1px solid #eee; background: white"
              frameborder="0"
            ></iframe>
          </b-modal>
          <b-modal
            v-model="showNewspaper"
            size="lg"
            id="md-showpage"
            title="Chọn link Trang"
            :hide-footer="true"
          >
            <b-table
              id="my-table"
              :fields="fieldNewspape"
              :items="listNewspaper"
              responsive="sm"
              :busy="false"
              class="mt-3"
              hover
              head-variant="light"
            >
              <template #cell(img)="data">
                <img
                  width="52"
                  height="75"
                  :src="getPathMedia(data.item.resource.path)"
                />
              </template>
              <template #cell(color)="data">
                <b-badge variant="danger" v-if="data.item.color == 'red'"
                  >Đỏ</b-badge
                >
                <b-badge variant="primary" v-else>Xanh</b-badge>
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
                <b-button
                  v-b-tooltip.hover
                  title="Chọn"
                  @click="handleChose(data.item, 'page')"
                  ><i class="pi pi-window-minimize"></i>
                </b-button>
              </template>
            </b-table>
          </b-modal>

          <b-modal
            v-model="showArticle"
            size="lg"
            id="md-showpage2"
            title="Chọn link Trang"
            :hide-footer="true"
          >
            <b-table
              id="my-table2"
              :fields="fieldArticle"
              :items="listArticle"
              responsive="sm"
              :busy="false"
              class="mt-3"
              hover
              head-variant="light"
            >
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
                <b-button
                  v-b-tooltip.hover
                  title="Chọn"
                  @click="handleChose(data.item, 'href')"
                  ><i class="pi pi-window-minimize"></i>
                </b-button>
              </template>
            </b-table>
          </b-modal>
        </div>
      </b-col>
    </b-row>
    <template #footer>
      <div class="group-btn-2">
        <!-- <b-button class="btn" variant="light">Xóa</b-button> -->
        <b-button class="btn btn-blue" @click="handleSubmit">Đồng ý</b-button>
      </div>
    </template>
  </b-card>
</template>

<script>
import VideoPlayer from "nuxt-video-player";
import FileManager from "../../components/card/file-manager.vue";
import inputSearch from "../../components/form/inputSearch.vue";
import qs from "querystring";
import { AxiosAuth } from "../../utils/axios";
import { getPathMedia } from "../../helpers/helpers";
import { setTimeout } from "timers";
import { DOMAIN_S3 } from "../../helpers/contants";
import axios from "axios";
export default {
  components: {
    FileManager,
    inputSearch,
    VideoPlayer,
  },
  props: ["detail"],
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("Bạn có muốn thoát khỏi page hiện tại?");
    if (answer) {
      next();
    } else {
      next(false);
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
      curNumberPage: 0,
      html_svg: "",
      color: "red",
      browFile: null,
      detail: {},
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
      // NEXT,
      reviewPage: false,
      showReview: false,
      showMedia: false,
      modalShow: false,
      autoSave: false,
      showArticle: false,
      showNewspaper: false,
      linkpage: 0,
      activeLine: "",
      file: "",
      Codetext: "",
      htmlReview: "",
      codeSvg: "",
      codeJson: "",
      img_type: "newspaper",
      proval: 0,
      curSize: "",
      totalSize: "",
      errIssue: "",
      Issue: "",
      ishowthumb: false,
      file_avatar: [],
      err_avatar: "",
      file_zip: {},
      file_zip_name: "",
      err_file_zip: "",
      avatar: "/img/Upload_duotone.svg",
      fieldNewspape: [
        { key: "page_number", label: "Số trang" },
        { key: "img", label: "Image" },
        { key: "color", label: "Màu sắc" },
        { key: "published_at", label: "Ngày tạo" },
        { key: "action", label: "Thao tác" },
      ],
      fieldArticle: [
        { key: "title", label: "title" },
        { key: "page_number", label: "Số trang" },
        { key: "published_at", label: "Ngày tạo" },
        { key: "action", label: "Thao tác" },
      ],
      listNewspaper: [],
      listArticle: [],
    };
  },

  mounted() {
    // LOAD DATA
    const _this = this;
    if (this.detail.resource) {
      console.log(this.detail);
      this.numberPage = this.detail.page_number;
      this.curNumberPage = this.detail.page_number;
      this.color = this.detail.color;
      this.militsecondime = this.detail.published_at;
      let d = new Date(this.detail.published_at * 1000);
      this.inputdate =
        d.getDate() + "/" + parseInt(d.getMonth() + 1) + "/" + d.getFullYear();
      this.specailized = this.detail.category.id;
      this.Issue = this.detail.issue;
      this.newsType = this.detail.app_id;
      this.$store.commit("setAppID", this.detail.app_id);
      localStorage.removeItem("initJmap");
      if (this.detail.html != null) {
        this.html_svg = this.detail.html.html_svg;
        let obj = JSON.parse(this.detail.html.html_map);
        console.log("remove");
        localStorage.setItem("initJmap", JSON.stringify(obj));
        console.log("initjmap");
      }
      $(document).trigger("init");
      if (this.detail.page_number == 1) {
        this.ishowthumb = true;
        if (this.detail.thumbnail) {
          this.file_avatar = this.detail.thumbnail;
          this.avatar = getPathMedia(this.detail.thumbnail.path);
        }
        if (this.detail.file) {
          this.file_zip = this.detail.file;
          this.file_zip_name = this.file_zip.name;
        }
      }
      // Load thumb
      // old data
      this.file = this.detail.resource;
      this.loadURLToInputFiled(
        getPathMedia(this.detail.resource.path),
        this.detail.resource.path
      );

      // render SVG
      if (this.detail.html != null) {
        $(".image-mapper-svg").html(this.detail.html.html_svg);
      }

      $(document).on("change", ".select-page", function () {
        let gslect = $(this).find("option:selected").val();
        _this.activeLine = $(this)
          .attr("name")
          .replace(/(im\[\w\])(.*)/gm, `$1`);
        $(`input[name='${_this.activeLine}[href]']`).prop("disabled", true);
        $(`input[name='${_this.activeLine}[href]']`).val("#");
        $(`input[name='${_this.activeLine}[href]']`).trigger("change");
        if (gslect == 0) {
          $(`input[name='${_this.activeLine}[href]']`).prop("disabled", false);
          $(`input[name='${_this.activeLine}[href]']`).attr(
            "placeholder",
            "Nhập link có sẵn vào đây!"
          );
          $(`input[name='${_this.activeLine}[href]']`).focus();
          return;
        }
        let url = gslect == 1 ? "/api/find-newspaper" : "/api/find-article";
        AxiosAuth.post(
          url,
          qs.stringify({
            published_at: _this.militsecondime,
            current_page: 1,
            total_item: 100,
            app_id: _this.$store.state.app_id,
          })
        )
          .then(({ data: res }) => {
            if (res.status) {
              if (gslect == 1) {
                _this.listNewspaper = res.data.list;
                _this.showNewspaper = true;
                $(`input[name='${_this.activeLine}[href]']`).attr(
                  "placeholder",
                  "Hãy chọn chuyên trang!"
                );
              } else if (gslect == 2) {
                _this.listArticle = res.data.list;
                _this.showArticle = true;
                $(`input[name='${_this.activeLine}[href]']`).attr(
                  "placeholder",
                  "Hãy chọn tin bài!"
                );
              }
            } else {
              _this.$bvToast.toast("Không có dữ liệu", {
                title: `Thông báo`,
                variant: "danger",
                solid: true,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      this.$bvToast.toast("Load Trang báo thất bại", {
        title: `Thông báo`,
        variant: "danger",
        solid: true,
      });
    }

    let currentSave = localStorage.getItem("autosave");
    if (currentSave != null) {
      let decoded = JSON.parse(window.atob(currentSave));
      if (decoded.status == 0) {
        _this.loadURLToInputFiled(decoded.img);
        $(".image-mapper-svg").html(decoded.codesvg);
        $("#image-mapper-table").html(decoded.table);
      }
    }
  },
  methods: {
    loadObj(data) {
      var b = $("#image-map").imageMapper("getData");
      // let objx = localStorage.getItem('initImg')
      // console.log(JSON.parse(objx))
      let arr = [];
      // console.log(b.area)
      data.map((v, k) => {
        let obj = {};
        obj.href = v.href;
        obj.link_page = v.link_page;
        obj.shape = v.shape;
        obj.target = v.target;
        obj.title = v.title;
        arr.push(obj);
      });
    },
    inputSelected(e) {
      this.specailized = e;
    },
    setFile(e) {
      this.file = e[0];
    },
    setDownload(e) {
      this.showMedia = false;
      if (e[0]) {
        this.file_zip = e[0];
        this.file_zip_name = this.file_zip.name;
      }
    },
    InserThumbTrangBao(e) {
      this.showMedia = false;
      if (e[0]) {
        this.avatar = getPathMedia(e[0].path);
        console.log(e[0]);
        this.file_avatar = e[0];
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
      let codeSvg = $(".image-mapper-svg").html();
      // if (codeSvg == this.html_svg) {
      //   this.$bvToast.toast(
      //     "Các vị trí trên hình hiển thị không đúng tỷ lệ hãy tạo mới các vị trí này!",
      //     {
      //       title: `Thông báo`,
      //       variant: "warning",
      //       solid: true,
      //     }
      //   );
      //   return;
      // }
      let jmap = $("#image-map").imageMapper("asHTML");
      $("#hiddenCode").html(jmap);
      let codehtml = $("#image-mapper-body").html();

      // let codehtml = $("#image-map").imageMapper("asHTML");
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
        id_news: this.detail.id,

        issue: this.Issue,
        published_at: this.militsecondime,
        page_number: this.numberPage,
        category_id: this.specailized,
        color: this.color,
        raw_height: $(".image-mapper-img").prop("naturalHeight"),
        raw_width: $(".image-mapper-img").prop("naturalWidth"),
        map: JSON.stringify(obj),
        app_id: this.newsType,
      };
      console.log("map", data);
      AxiosAuth.post(`/api/edit-newspaper`, qs.stringify(data))
        .then(({ data: res }) => {
          if (res.status) {
            this.$bvToast.toast("Chỉnh sửa thành công !", {
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
    },
    onContext(ctx) {
      if (ctx.selectedDate == null) {
        // this.inputdate = ctx.activeFormatted;
        // this.militsecondime = ctx.activeDate.getTime() / 1000;
      } else {
        this.inputdate = ctx.selectedFormatted;
        this.militsecondime = ctx.selectedDate.getTime() / 1000;
      }
    },
    // NEXT
    convertToTime(number) {
      let d = new Date(number * 1000);
      return (
        d.getDate() + "/" + parseInt(d.getMonth() + 1) + "/" + d.getFullYear()
      );
    },
    handleChose(item, types) {
      if (types == "page") {
        $(`input[name='${this.activeLine}[href]']`).val(
          `javascript:setPage(${item.page_number})`
        );
        $(`input[name='${this.activeLine}[title]']`).val(
          `Trang ${item.page_number}`
        );
        $(`input[name='${this.activeLine}[href]']`).trigger("change");
        $(`input[name='${this.activeLine}[title]']`).trigger("change");
        $(`select[name='${this.activeLine}[target]']`).val("");
        this.showNewspaper = false;
      } else {
        $(`input[name='${this.activeLine}[href]']`).val(item.url);
        $(`input[name='${this.activeLine}[title]']`).val(item.title);
        $(`input[name='${this.activeLine}[href]']`).trigger("change");
        $(`input[name='${this.activeLine}[title]']`).trigger("change");
        $(`select[name='${this.activeLine}[target]']`).val("_blank");
        this.showArticle = false;
      }
      $(`select[name='${this.activeLine}[target]']`).trigger("change");
    },
    getPathMedia: getPathMedia,
    handlePageReview() {
      this.reviewPage = true;
      let codehtml = $("#image-map").imageMapper("asHTML");
      const result = codehtml.replace(/<img([\w\W]+?)>/gm, ``);
      let html = `<img src="${getPathMedia(
        this.file.path
      )}" usemap="#image-map">`;
      this.htmlReview = html + result;
      window.localStorage.setItem("code-review", this.htmlReview);
      this.$store.commit("setCodeReview", this.htmlReview);
    },
    InsertMedia(e) {
      let _this = this;
      this.showMedia = false;
      if (e[0]) {
        _this.file = e[0];
        _this.loadURLToInputFiled(getPathMedia(e[0].path), e[0].path);
      }
    },
    formatBytes(bytes) {
      var kb = 1024;
      var ndx = Math.floor(Math.log(bytes) / Math.log(kb));
      var fileSizeTypes = [
        "bytes",
        "kb",
        "mb",
        "gb",
        "tb",
        "pb",
        "eb",
        "zb",
        "yb",
      ];
      return {
        size: +(bytes / kb / kb).toFixed(2),
        type: fileSizeTypes[ndx],
      };
    },
    handleChangeFile(e) {
      this.$bvToast.show("my-toast");
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      formData.append("news_art_type", this.img_type);
      AxiosAuth.post("/api/upload/", formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          console.log(`${loaded}kb of ${total}kb | ${percent}%`);
          this.proval = percent;
          this.curSize = this.formatBytes(loaded);
          this.totalSize = this.formatBytes(total);
        },
      })
        .then(({ data: res }) => {
          if (res.success) {
            this.callAPICreateRes(res.info);
            // this.handleUploadS3(formData, res.info);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleUploadS3(formData, resObj) {
      this.$bvToast.show("my-toast");
      formData.append("list_res_info", JSON.stringify(resObj));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlcjEiLCJleHBpcmVzIjoxNjcxMTgwODM5LjY0NTQ0MTV9.Fy28rOfieiFFAE3S6sVLHhE_1bwy1-XizUwe6MisclE`;
      axios
        .post(DOMAIN_S3 + "/uploads3", formData, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            console.log(`${loaded}kb of ${total}kb | ${percent}%`);
            this.proval = percent;
            this.curSize = this.formatBytes(loaded);
            this.totalSize = this.formatBytes(total);
          },
        })
        .then(({ data: res }) => {
          if (res.result) {
            this.callAPICreateRes(resObj);
            console.log("upload suceess");
          } else {
            this.$bvToast.toast(res.data, {
              title: `Thông báo`,
              variant: "danger",
              solid: true,
            });
            console.log("error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    callAPICreateRes(dataFile) {
      if (dataFile.length > 0) {
        let arrFile = [];
        dataFile.map((v, k) => {
          let fileSend = {};
          fileSend.name = v.resource_name;
          fileSend.type = v.resource_type;
          fileSend.path = v.resource_path;
          fileSend.extension = v.resource_extension;
          arrFile.push(fileSend);
        });

        AxiosAuth.post(
          "/api/res-create",
          qs.stringify({
            resources: JSON.stringify(dataFile),
          })
        )
          .then(({ data: res }) => {
            if (res.status) {
              this.$bvToast.toast(res.message, {
                title: `Thông báo`,
                variant: "success",
                solid: true,
              });
              setTimeout(() => {
                this.file = arrFile[0];
                let url = getPathMedia(dataFile[0].resource_path);
                this.loadURLToInputFiled(url, dataFile[0].resource_path);
              }, 1000);
            } else {
              this.$bvToast.toast(res.message, {
                title: `Thông báo`,
                variant: "danger",
                solid: true,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    handleClickUpload() {
      this.$refs["browFileInput"].$el.click();
    },
    ShowResources() {
      this.showMedia = true;
    },
    loadURLToInputFiled(url, path) {
      let _this = this;
      $(".image-mapper-img").attr("src", url);
      $(".image-mapper-img").attr("data-url", path);
      _this.showReview = true;
    },
    onChangePage(val) {
      this.$store.dispatch("handleLoadNewsSpaper", {
        curent_day: this.militsecondime,
        app_id: this.newsType,
      });
      setTimeout(() => {
        this.$router.push("#page-" + val);
        let listPageToday = this.$store.state.listPageToday;
        if (this.curNumberPage == val) {
          if (val == 1) {
            this.ishowthumb = true;
          } else {
            this.ishowthumb = false;
          }
          return;
        }
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
    HandleClick(isModal) {
      let codehtml = $("#image-map").imageMapper("asHTML");
      var db = $("#image-map").imageMapper("getData");
      let codeSvg = $(".image-mapper-svg").html();
      if (codehtml.length > 0) {
        this.Codetext = codehtml;
        this.codeSvg = codeSvg;
        if (isModal) {
          this.modalShow = !this.modalShow;
        }
      }
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
          area[index] = {
            idx: idx,
            title: title,
            alt: alt,
            href: href,
            coords: coords,
            shape: shape,
          };
        });
      obj.img = this.file;
      obj.map = area;
      this.codeJson = obj;
    },
  },
  watch: {
    specailized(val) {},
    militsecondime(val) {
      this.$store.dispatch("handleLoadNewsSpaper", {
        curent_day: val,
        app_id: this.$store.state.app_id,
      });
    },
    newsType(val) {
      this.$store.commit("setAppID", val);
    },
  },
  computed: {
    specailizedID() {
      if (this.detail.category) {
        return {
          id: this.detail.category.id,
          title: this.detail.category.name,
        };
      }
    },
  },
  head: {
    title: "Chỉnh sửa Trang Báo",
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
#image-mapper-upload {
  background: #6993ff;
  border-radius: 7px;
  color: #fff;
}

textarea.form-control {
  height: auto;
  background-color: #130820;
}
/* .toggle-content {
  display: none;
} */
pre code.hljs {
  border-radius: 5px;
  background: black;
}
#hiddenCode {
  display: none;
}
.form-control {
  background-color: #f5f8fa;
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

<style>
.err-form small.text-muted {
  color: red !important;
}
</style>
