<template>
  <div>
    <b-row>
      <b-col sm="9">
        <!-- <b-form-group
          class="mt-1 label-input err-form"
          label="Tiêu đề"
          :description="form.errTitle"
        >
          <b-form-input
            type="text"
            class="input-value"
            v-model="form.title"
            placeholder="Nhập tiêu đề"
          ></b-form-input>
        </b-form-group> -->
        <no-ssr>
          <b-form-group
            class="mt-1 label-input err-form"
            :description="errContent"
          >
            <ckeditor
              id="ckedit"
              @namespaceloaded="onNamespaceloaded"
              v-model="content"
              :config="editorConfig"
            ></ckeditor>
          </b-form-group>
        </no-ssr>
      </b-col>
      <b-col sm="3">
        <b-form-group class="mt-1 label-input err-form" :description="errThumb">
          <div class="review-img text-center" @click="showFileManager(1)">
            <img
              :style="thumb != true ? 'width:100%' : ''"
              alt="Logo"
              :src="
                defaulThumb == '/img/Upload_duotone.svg'
                  ? '/img/Upload_duotone.svg'
                  : getPathMedia(defaulThumb)
              "
            />
            <p v-show="thumb">Chọn thumbnail</p>
          </div>
        </b-form-group>

        <b-form-group class="mt-1 label-input" label="Chọn loại báo">
          <b-form-select
            class="input-value"
            v-model="newsType"
            :options="newsTypeSelect"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          class="mt-1 label-input err-form"
          label="Chọn ngày"
          :description="errDate"
        >
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

        <b-form-group
          class="mt-1 label-input err-form"
          label="Tên chuyên trang"
          :description="errSpecailized"
        >
          <inputSearch
            @select-event="inputSelected"
            :selectedCat="specailizedID"
          />
        </b-form-group>

        <b-form-group
          class="mt-1 label-input err-form"
          label="Số trang"
          :description="errNumPage"
        >
          <b-form-input
            type="number"
            class="input-value"
            v-model="numberPage"
            placeholder=""
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="mt-1 label-input err-form"
          label="Tác giả"
          :description="errAuthor"
        >
          <b-form-input
            type="text"
            class="input-value"
            v-model="Author"
            placeholder="Nhập tên tác giả"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="mt-1 label-input err-form"
          label="Chọn Audio"
          :description="errAudio"
        >
          <b-input-group style="flex-wrap: inherit">
            <b-input-group-prepend
              v-b-tooltip.hover
              title="Chọn audio"
              @click="showFileManager(3)"
            >
              <span class="input-group-text">
                <i class="pi pi-volume-off"></i
              ></span>
            </b-input-group-prepend>
            <b-form-input
              disabled
              type="text"
              class="input-value"
              :placeholder="
                dfAudio != null ? dfAudio.path : 'Chọn audio tin bài chi tiết'
              "
            ></b-form-input>
            <b-input-group-append v-b-tooltip.hover title="Play audio">
              <span
                class="input-group-text"
                v-if="!statusAudio"
                @click="playAudio"
              >
                <i class="pi pi-play"></i>
              </span>
              <span class="input-group-text" v-else @click="stopAudio">
                <i class="pi pi-pause"></i>
              </span>
            </b-input-group-append>
          </b-input-group>
          <video-player v-show="false" :src="defaultAudio" />
        </b-form-group>

        <div class="btn-group mt-5">
          <b-button
            class="btn btn-blue"
            @click="showFileManager(1)"
            style="border-radius: 5px"
            >Chèn Resources</b-button
          >
          <b-button class="btn btn-blue" v-if="btnLoading">
            <b-spinner small label="Small Spinner"></b-spinner
          ></b-button>
          <b-button class="btn btn-blue" v-else @click="handdleSumbit"
            >Sửa tin</b-button
          >
        </div>
      </b-col>
    </b-row>
    <div id="html_content" v-show="false"></div>
    <b-modal
      v-model="show"
      size="xl"
      id="md-resources"
      title="Resources"
      :hide-footer="true"
    >
      <FileManager
        @sending-setThumb="setThumb"
        @sending-setAudio="setAudio"
        @sending-insert="InsertMedia"
        :tabActive="tabactive"
      />
      <hr />
    </b-modal>
  </div>
</template>
  
  <script>
import FileManager from "../../components/card/file-manager.vue";
import { ARTICLE, SPECIALIZED_PAGE } from "../../helpers/contants";
import { IsAllowRole, getPathMedia, to_slug } from "../../helpers/helpers";
import { AxiosAuth } from "../../utils/axios";
import inputSearch from "../../components/form/inputSearch.vue";
import { decode } from "html-entities";
import qs from "querystring";
export default {
  props: {
    titlebox: {
      type: String,
    },
    detail: {
      type: Object,
    },
  },
  components: {
    FileManager,
    inputSearch,
  },
  data() {
    return {
      show: false,
      thumb: true,
      dfthumb: null,
      dfAudio: null,
      btnLoading: false,
      listResources: [],
      tabactive: 1,
      errTitle: "",
      title: "",
      chapue: "",
      errChapue: "",
      errDate: "",
      errThumb: "",
      errContent: "",
      errNumPage: "",
      errAudio: "",
      defaulThumb: "/img/Upload_duotone.svg",
      defaultAudio: "",
      statusAudio: false,
      content: "",
      contentHtml: "",
      newsType: "20",
      newsTypeSelect: [
        { value: "20", text: "Báo ngày" },
        { value: "15", text: "Tuổi Trẻ Cười" },
        { value: "19", text: "Tuổi Trẻ Cuối Tuần" },
      ],
      inputdate: "",
      date: "",
      published_at: 0,
      specailized: 0,
      errSpecailized: "",
      numberPage: 1,
      Author: "",
      errAuthor: "",
      editorConfig: {
        height: 700,
        contentsCss : '/ckeditor/css/contents.css',
        language: "vi",
        extraPlugins: "justify, div, image2,titlebox,sapobox,simplebox",
        removeButtons:
          "NewPage,Print,Save,Templates,Replace,Find,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,HiddenField,Anchor,Flash,Smiley,PageBreak,ShowBlocks,About,Language,Iframe",
      },
    };
  },
  mounted() {
    console.log(this.detail);
    if (this.detail) {
      this.content = this.detail.content;
      this.numberPage = this.detail.page_number;
      this.newsType = this.detail.app_id
      this.defaulThumb = this.getDfFile(this.detail.resource, 2) != null ? this.getDfFile(this.detail.resource, 2).path : ""
      this.dfthumb = this.getDfFile(this.detail.resource, 2) !=null ? this.getDfFile(this.detail.resource, 2) : null
      this.dfAudio = this.getDfFile(this.detail.resource, 3) != null ? this.getDfFile(this.detail.resource, 3).path : ""
      this.dfAudio = this.getDfFile(this.detail.resource, 3) !=null ? this.getDfFile(this.detail.resource, 3) : null
      this.published_at = this.detail.published_at;
      this.Author = this.detail.author;
      let d = new Date(this.detail.published_at * 1000);
      this.inputdate = d.getDate() + "/" + parseInt(d.getMonth() + 1) + "/" + d.getFullYear();
      this.specailized = this.detail.category.id;
      this.thumb = false;
    }
  },
  methods: {
    getPathMedia: getPathMedia,
    onNamespaceloaded(CKEDITOR) {
      CKEDITOR.plugins.addExternal(
        "titlebox,sapobox,simplebox",
        "/ckeditor/plugin/plugin.js"
      );
    },
    onContext(ctx) {
      console.log(ctx);
      if (ctx.selectedDate == null) {
        //   this.inputdate = ctx.activeFormatted;
        //   this.published_at = new Date(1668556800*1000)
      } else {
        this.inputdate = ctx.selectedFormatted;
        this.published_at = ctx.selectedDate.getTime() / 1000;
      }
    },
    getDfFile(list, type){
      let file = null
      list.map((v,k)=>{
        if(v.resource_type == type){
          file = v
        }
      })
      return file
    },
    getPathMediaType(path, vtype) {
      let link = "";
      if (vtype == "video") {
        link = "/img/video.png";
      } else if (vtype == "audio") {
        link = "/img/audio.png";
      } else {
        link = this.getPathMedia(path);
      }
      return link;
    },
    InsertMedia(list) {
      this.show = false;
      list.map((v, k) => {
        this.listResources.push(v);
        if (v.type == "image") {
          this.content =
            this.content +
            `<img width="300" src="${this.getPathMedia(
              v.path
            )}" title="" /><br/>`;
        } else if (v.type == "video") {
          this.content =
            this.content +
            `[VIDEO id="${v.id}" path="${v.path}"  type="${
              v.extension
            }"]${this.getPathMedia(v.path)}[/VIDEO]<br/>`;
        } else {
          this.content =
            this.content +
            `[AUDIO id="${v.id}" path="${v.path}"  type="${
              v.extension
            }"]${this.getPathMedia(v.path)}[/AUDIO]<br/>`;
        }
      });
    },
    playAudio() {
      if (this.dfAudio != null) {
        this.statusAudio = true;
        this.defaultAudio = getPathMedia(this.dfAudio.path);
      } else {
        this.$bvToast.toast("Vui lòng chọn Audio để nghe!", {
          title: `Thông báo`,
          variant: "danger",
          solid: true,
        });
      }
    },
    stopAudio() {
      this.statusAudio = false;
      this.defaultAudio = "";
    },
    setAudio(e) {
      if (e.length > 0) {
        this.dfAudio = e[0];
        this.show = false;
      }
    },
    setThumb(e) {
      if (e.length > 0) {
        this.defaulThumb = e[0].path;
        this.dfthumb = e[0];
        this.thumb = false;
        this.show = false;
      }
    },
    showFileManager(tabIndex) {
      this.show = true;
      this.tabactive = tabIndex;
    },
    previewFiles(e) {
      let _this = this;
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      _this.defaulThumb = URL.createObjectURL(file);
      this.thumb = false;
    },
    inputSelected(e) {
      this.specailized = e;
    },
    validateFormCountErr() {
      this.errAuthor = this.Author.length == 0 ? "Hãy nhập tên tác giả" : "";
      this.errDate = this.published_at == 0 ? "Hãy chọn ngày" : "";
      this.errContent = this.content.length == 0 ? "Chưa nhập nội dung" : "";
      this.errThumb =
        this.defaulThumb == "/img/Upload_duotone.svg"
          ? "Chưa chọn ảnh đại diện"
          : "";
      this.errNumPage =
        this.numberPage == 0 || this.numberPage > 20
          ? "Số trang chỉ được phép từ 1-20"
          : "";
      this.errSpecailized =
        this.specailized == 0 ? "Chưa chọn tên chuyên trang" : "";
      this.errAudio =
        this.dfAudio == null ? "Chưa chọn audio cho trang chi tiết" : "";
      let hasErrString =
        this.errAuthor +
        this.errDate.length +
        this.errContent.length +
        this.errThumb.length +
        this.errSpecailized.length +
        this.errAudio.length;
      return hasErrString;
    },
    handdleSumbit() {
      let tottalErr = this.validateFormCountErr();
      let url = to_slug(this.title);
      if (url == undefined) {
        this.$bvToast.toast("Chưa nhập Tiêu đề trong khung soạn thảo!", {
          title: `Thông báo`,
          variant: "warning",
          solid: true,
        });
        return;
      }
      if (this.chapue == "") {
        this.$bvToast.toast("Chưa nhập Chapue trong khung soạn thảo!", {
          title: `Thông báo`,
          variant: "warning",
          solid: true,
        });
        return;
      }
      if (tottalErr == 0) {
        let thumb = {};
        // thumbnail : là 1 mảng json ( thumbnail_name, thumbnail_type, thumbnail_path, thumbnail_extension)
        thumb.thumbnail_name = this.dfthumb.name;
        thumb.thumbnail_type = this.dfthumb.type;
        thumb.thumbnail_path = this.dfthumb.path;
        thumb.thumbnail_extension = this.dfthumb.extension;
        let audio = {};
        // - audio_head : là 1 mảng json (audio_head_name, audio_head_type, audio_head_path, audi_head_extension)
        audio.audio_head_name = this.dfAudio.name;
        audio.audio_head_type = this.dfAudio.type;
        audio.audio_head_path = this.dfAudio.path;
        audio.audio_head_extension = this.dfAudio.extension;

        let obj = {
          title: this.title,
          chapue: this.chapue,
          id: this.detail.id,
          thumbnail: JSON.stringify(thumb),
          audio_head: JSON.stringify(audio),
          resources: JSON.stringify(this.listResources),
          content: this.content,
          type: this.newsType,
          author: this.Author,
          published_at: this.published_at,
          page_number: this.numberPage,
          category_id: this.specailized,
          app_id: this.newsType
        };
        console.log(obj);
        this.btnLoading = true;
        AxiosAuth.post(`/api/edit-article`, qs.stringify(obj))
          .then(({ data: res }) => {
            if (res.status) {
              this.$bvToast.toast("Sửa tin thành công !", {
                title: `Thông báo`,
                variant: "success",
                solid: true,
              });
              setTimeout(() => {
                location.reload();
              }, 2000);
            } else {
              this.$bvToast.toast("Có lỗi trong quá trình Sửa tin!", {
                title: `Thông báo`,
                variant: "danger",
                solid: true,
              });
              this.btnLoading = false;
            }
          })
          .catch((err) => {});
      } else {
        this.$bvToast.toast("Hãy nhập vào các thông tin cần thiết", {
          title: `Thông báo`,
          variant: "warning",
          solid: true,
        });
        this.btnLoading = false;
      }
    },
  },
  computed: {
    allRole() {
      return this.$store.state.auth.roles.children;
    },
    listCate() {
      return this.$store.state.listCate;
    },
    specailizedID() {
      return { id: this.detail.category.id, title: this.detail.category.name };
    },
  },
  watch: {
    content(val) {
      let _this = this;
      $("#html_content").html(val);
      setTimeout(() => {
        let title = $("#html_content #content_title").find("h1").text();
        let chapue = $("#html_content #content_caption").find("h2").text();
        _this.title = title;
        _this.chapue = chapue;
      }, 500);
    },
  },
  head: {
    title: "Sửa tin",
  },
};
</script>
  
  <style scoped>
.review-img {
  background: #f3f6f9;
  border: 1px dashed #6993ff;
  padding: 50px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #6993ff;
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
.btn-group {
  float: right;
}
.btn-group .btn {
  margin-left: 10px;
  border-radius: 5px;
}
</style>
  
  <style>
.err-form small.text-muted {
  color: red !important;
}
</style>