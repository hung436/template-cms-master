<template>
  <div>
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
          <div id="image-map" style="max-width: 100%" class="image-mapper">
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
              <b-button
                class="btn-delete"
                v-b-tooltip.hover
                title="Xóa"
                name="im[0][remove]"
              ></b-button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="6" style="text-align: right">
              <button type="button" class="btn btn-danger btn-sm add-row">
                <span class="glyphicon glyphicon-plus"></span> Thêm
              </button>
              <button
                class="ml-2 btn btn-info btn-sm"
                @click="handlePageReview"
              >
                Review
              </button>
              <!-- <b-button
                class="btn-sm"
                variant="success"
                @click="HandleClick(true)"
                >Show Code</b-button
              > -->
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
      <div class="text-right">
        <button class="btn btn-info btn-sm" @click="handlePageReview">
          Review
        </button>
      </div>
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
        @sending-setThumb="setThumb"
        @sending-insert="InsertMedia"
        @sending-thumb-trang-bao="InserThumbTrangBao"
        :imgType="img_type"
        @sending-setDownload="setDownload"
        :showSetThumb="false"
        :maxImgFile="1"
      />
    </b-modal>
    <b-modal v-model="reviewPage" size="xl" id="md-review" title="Page review">
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
          <b-badge variant="danger" v-if="data.item.color == 'red'">Đỏ</b-badge>
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
</template>

<script>
import FileManager from "../card/file-manager.vue";
import { getPathMedia } from "../../helpers/helpers";
import { AxiosAuth } from "../../utils/axios";
import qs from "querystring";
import axios from "axios";
import { DOMAIN_S3 } from "../../helpers/contants";
export default {
  components: {
    FileManager,
  },
  props: {
    time: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      reviewPage: false,
      showReview: false,
      showMedia: false,
      modalShow: false,
      autoSave: false,
      showArticle: false,
      showNewspaper: false,
      browFile: null,
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
    // this.$nextTick(() => {
    const _this = this;
    (function ($) {
      $(document).trigger("init");
    })(jQuery);

    $(document).on("change", ".select-page", function () {
      let gslect = $(this).find("option:selected").val();
      _this.activeLine = $(this)
        .attr("name")
        .replace(/(im\[\w\])(.*)/gm, `$1`);
      $(`input[name='${_this.activeLine}[href]']`).val("#");
      $(`input[name='${_this.activeLine}[href]']`).trigger("change");
      $(`input[name='${_this.activeLine}[href]']`).prop("disabled", true);
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
          published_at: _this.time,
          current_page: 1,
          total_item: 100,
          app_id: _this.$store.state.app_id
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
    let currentSave = localStorage.getItem("autosave");
    if (currentSave != null) {
      let decoded = JSON.parse(window.atob(currentSave));
      if (decoded.status == 0) {
        _this.loadURLToInputFiled(decoded.img);
        console.log(decoded.codesvg);
        $(".image-mapper-svg").html(decoded.codesvg);
        $("#image-mapper-table").html(decoded.table);
      }
    }
    // });

    // setInterval(() => {
    //   this.HandleClick(false);
    //   this.autoSave = !this.autoSave;
    // }, 5000);
  },
  methods: {
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
      let html = `<img src="${this.file}" usemap="#image-map">`;
      this.htmlReview = html + result;
      window.localStorage.setItem("code-review", this.htmlReview);
      this.$store.commit("setCodeReview", this.htmlReview);
    },
    InsertMedia(e) {
      let _this = this;
      this.showMedia = false;
      if (e[0]) {
        this.$emit("some-event", e);
        _this.file = getPathMedia(e[0].path);
        _this.loadURLToInputFiled(_this.file, e[0].path);
      }
    },
    InserThumbTrangBao(e){
      this.showMedia = false;
      if (e[0]) {
        this.$emit("some-thumb", e);
      }
    },
    setThumb(e) {
      let _this = this;
      this.showMedia = false;
      if (e[0]) {
        _this.loadURLToInputFiled(e[0].path, e[0].path);
      }
    },
    setDownload(e){
      this.showMedia = false;
      if (e[0]) {
        this.$emit("some-download", e);
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
      this.proval = 0;
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
            app_id: this.$store.state.app_id,
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
                this.$emit("some-event", arrFile);
                this.file = getPathMedia(dataFile[0].resource_path);
                this.loadURLToInputFiled(this.file, dataFile[0].resource_path);
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
      // fetch(url, { mode: 'no-cors'})
      //   .then((response) => response.blob())
      //   .then((blob) => {
      //     // const imageUrl = URL.createObjectURL(blob);
      //     // console.log(imageUrl)
      //     // const img = document.getElementsByClassName("image-mapper-img")[0];
      //     // img.addEventListener("load", () => URL.revokeObjectURL(imageUrl));
      //     // $(".image-mapper-img").attr('src',imageUrl)
      //     $(".image-mapper-img").attr('src',url)
      //     $(".image-mapper-img").attr('data-url',url)
      //     _this.showReview = true;
      //   });
    },
    HandleClick(isModal) {
      let codehtml = $("#image-map").imageMapper("asHTML");
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
      obj.img = this.file;
      obj.map = area;
      console.log(obj);
      this.codeJson = obj;
    },
  },
};
</script>

<style scoped>
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