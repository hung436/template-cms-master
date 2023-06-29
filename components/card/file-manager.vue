<template>
  <div>
    <b-row>
      <b-col sm="9">
        <div v-show="$route.name == 'resources'">
          <b-form-radio-group id="radio-group-1" v-model="app_id">
            <b-form-radio value="20" v-b-tooltip.hover title="Nhật Báo Tuổi Trẻ"
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
          <hr />
        </div>
        <b-tabs
          active-nav-item-class="font-weight-bold text-uppercase text-danger"
          active-tab-class="font-weight-bold text-success"
          content-class="mt-3"
        >
          <b-tab
            title="Hình Ảnh"
            :active="1 == tabActive"
            lazy
            @click="handleTabIndex(1)"
          >
            <b-row>
              <b-col sm="9">
                <div class="box-upload-img">
                  <UploadImages
                    @changed="handleImages"
                    :max="maxImgFile"
                    :maxError="`Hình ảnh tải lên tối đa là ${maxImgFile}`"
                    uploadMsg="Chọn hoặc kéo thả hình ảnh vào đây"
                    fileError="Chỉ chấp nhận tệp hình ảnh "
                    clearAll="Xóa tất cả"
                    ref="file-store"
                  />
                </div>
              </b-col>
              <b-col sm="3">
                <div class="text-center mt-5">
                  <b-form-radio-group id="radio-group-2" v-model="img_type">
                    <b-form-radio value="newspaper" :disabled="NhaptinDisalbe"
                      >Chuyên trang</b-form-radio
                    >
                    <b-form-radio value="article" :disabled="ChuyenTrangDisalbe"
                      >Tin tức</b-form-radio
                    >
                  </b-form-radio-group>
                  <hr />
                  <b-button
                    class="p-button p-component mt-1"
                    :disabled="!isShowBtn"
                    @click="handleUpload"
                  >
                    <span
                      class="pi pi-upload p-button-icon p-button-icon-left"
                    ></span
                    ><span class="p-button-label">Tải lên</span
                    ><span class="p-ink"></span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab
            title="Video"
            :active="2 == tabActive"
            lazy
            @click="handleTabIndex(2)"
            :disabled="ChuyenTrangDisalbe"
          >
            <div class="p-fileMedia">
              <div class="p-fileMedia-buttonbar">
                <b-button
                  class="p-button p-component p-fileMedia-choose"
                  @click="handeBrowfile"
                >
                  <b-form-file
                    ref="inputFile"
                    accept="video/mp4,video/x-m4v,video/*"
                    v-model="otherFile"
                    style="display: none"
                    plain
                  ></b-form-file>
                  <span
                    class="p-button-icon p-button-icon-left pi pi-fw pi-plus"
                  >
                  </span
                  ><span class="p-button-label">Chọn Video</span
                  ><span class="p-ink"> </span>
                </b-button>
                <b-button
                  class="p-button p-component ml-2"
                  :disabled="!fileSrc || enableBtn"
                  @click="handleUploadMedia"
                >
                  <span
                    class="pi pi-upload p-button-icon p-button-icon-left"
                  ></span
                  ><span class="p-button-label">Tải lên</span
                  ><span class="p-ink"></span>
                </b-button>
              </div>
              <div
                class="p-fileMedia-content"
                v-if="fileSrc"
                style="width: 400px"
              >
                <span class="sp-remove" @click="handleRemoveMedia">❌</span>
                <video-player :src="fileSrc" />
              </div>
              <div class="text-center" v-show="showLoadfile">
                <b-spinner
                  variant="primary"
                  type="grow"
                  label="Spinning"
                ></b-spinner>
              </div>
              <hr />
            </div>
          </b-tab>
          <b-tab
            title="Audio"
            :active="3 == tabActive"
            lazy
            @click="handleTabIndex(3)"
            :disabled="ChuyenTrangDisalbe"
          >
            <div class="p-fileMedia">
              <div class="p-fileMedia-buttonbar">
                <b-button
                  class="p-button p-component p-fileMedia-choose"
                  @click="handeBrowfile"
                >
                  <b-form-file
                    ref="inputFile"
                    accept=".mp3,audio/*"
                    v-model="otherFile"
                    style="display: none"
                    plain
                  ></b-form-file>
                  <span
                    class="p-button-icon p-button-icon-left pi pi-fw pi-plus"
                  >
                  </span
                  ><span class="p-button-label">Chọn Audio</span
                  ><span class="p-ink"> </span>
                </b-button>
                <b-button
                  class="p-button p-component ml-2"
                  :disabled="!fileSrc || enableBtn"
                  @click="handleUploadMedia"
                >
                  <span
                    class="pi pi-upload p-button-icon p-button-icon-left"
                  ></span
                  ><span class="p-button-label">Tải lên</span
                  ><span class="p-ink"></span>
                </b-button>
              </div>
              <div
                class="p-fileMedia-content"
                v-if="fileSrc"
                style="width: 400px"
              >
                <span class="sp-remove" @click="handleRemoveMedia">❌</span>
                <video-player :src="fileSrc" />
              </div>
              <div class="text-center" v-show="showLoadfile">
                <b-spinner
                  variant="primary"
                  type="grow"
                  label="Spinning"
                ></b-spinner>
              </div>
              <hr />
            </div>
          </b-tab>
          <b-tab
            title="Zip file"
            :active="4 == tabActive"
            lazy
            @click="handleTabIndex(4)"
            :disabled="NhaptinDisalbe"
          >
            <div class="p-fileMedia">
              <div class="p-fileMedia-buttonbar">
                <b-button
                  class="p-button p-component p-fileMedia-choose"
                  @click="handeBrowfilezip"
                >
                  <b-form-file
                    ref="inputFilezip"
                    accept=".zip,.rar"
                    v-model="otherFile"
                    style="display: none"
                    plain
                  ></b-form-file>
                  <span
                    class="p-button-icon p-button-icon-left pi pi-fw pi-plus"
                  >
                  </span
                  ><span class="p-button-label">Chọn File</span
                  ><span class="p-ink"> </span>
                </b-button>
                <b-button
                  class="p-button p-component ml-2"
                  :disabled="!fileSrc || enableBtn"
                  @click="handleUploadMedia"
                >
                  <span
                    class="pi pi-upload p-button-icon p-button-icon-left"
                  ></span
                  ><span class="p-button-label">Tải lên</span
                  ><span class="p-ink"></span>
                </b-button>
              </div>
              <div
                class="p-fileMedia-content mt-5"
                v-if="fileSrc"
                style="width: 100px"
              >
                <span class="sp-remove" @click="handleRemoveMedia">❌</span>
                <img height="100" src="/img/winrar.png" />
                {{ fileSrc.name }}
              </div>
              <div class="text-center" v-show="showLoadfile">
                <b-spinner
                  variant="primary"
                  type="grow"
                  label="Spinning"
                ></b-spinner>
              </div>
              <hr />
            </div>
          </b-tab>
        </b-tabs>
        <b-alert class="mt-3" v-show="isShowInfoUpload" show variant="primary"
          >Đang tiến hành tải lên, vui lòng đợi cho đến khi hoàn tất!
          <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
          <div v-show="proval > 0">
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
          <hr />
        </b-alert>

        <b-row>
          <b-skeleton-table
            v-if="fileMedia.length == 0"
            :rows="4"
            :columns="5"
            :table-props="{ bordered: true, striped: true }"
          ></b-skeleton-table>
          <b-col
            v-else
            sm="2"
            class="box-img mt-5 text-align: center;"
            v-for="(value, key) in fileMedia"
            :key="key"
          >
            <!-- hình resize 14/3/2023 -->

            <b-img
              v-if="
                value.created_at >= 1678813200 &&
                value.news_art_type == 'newspaper'
              "
              thumbnail
              fluid
              :src="
                value.type == 'application'
                  ? '/img/winrar.png'
                  : getResize(value.path)
              "
              alt="Image 1222"
              class="img-card"
            ></b-img>

            <b-img
              v-else
              thumbnail
              fluid
              :src="getPathMediaType(value.path, value.type)"
              alt="Image 1"
              class="img-card"
            ></b-img>
            <input :value="value.name" class="input-textinfo" disabled />
            <div class="img-tool">
              <span
                @click="handlerAdd(value, key + 1)"
                v-b-tooltip.hover
                title="Thêm"
                >➕</span
              >
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="3">
        <div v-if="reviewFile == null">
          <b-skeleton-img />
          <b-skeleton-table
            :rows="6"
            :columns="1"
            :table-props="{ bordered: true, striped: true }"
          ></b-skeleton-table>
        </div>

        <b-card v-else class="card-review">
          <div>
            <div class="text-center">
              <div class="type-img" v-if="reviewFile.type == 'image'">
                <img width="200" :src="getPathMedia(reviewFile.path)" />
              </div>
              <div
                class="type-img"
                v-else-if="reviewFile.type == 'application'"
              >
                <img width="200" src="/img/winrar.png" />
              </div>
              <div class="type-media" v-else>
                <video-player
                  :autoplay="false"
                  :src="getPathMedia(reviewFile.path)"
                />
              </div>
            </div>
            <br />
            <b-badge variant="light">APP_ID:</b-badge
            ><span class="info-img">{{ reviewFile.app_id }}</span>
            <b-badge
              href="#"
              variant="dark"
              @click="handelDelete(reviewFile.id)"
              >Xóa</b-badge
            ><br />
            <b-badge variant="light">name:</b-badge
            ><span class="info-img">{{ reviewFile.name }}</span> <br />
            <b-badge variant="light">extension:</b-badge>
            <span class="info-img">{{ reviewFile.extension }}</span
            ><br />
            <b-badge variant="light">Link:</b-badge> :
            <span class="info-img">{{ getPathMedia(reviewFile.path) }}</span>
          </div>
          <hr />
          <b-card-text class="mt-5 text-center" v-show="ishowList">
            <b-list-group>
              <b-list-group-item
                v-for="(img, k) in listChose"
                :key="k"
                class="d-flex justify-content-between align-items-center"
              >
                <img
                  height="30px"
                  :src="getPathMediaType(img.path, img.type)"
                />
                <b-badge variant="light" pill>{{ img.name }}</b-badge>
                <b-badge href="#" variant="light" @click="handleRemove(img)"
                  >❌</b-badge
                >
              </b-list-group-item>
            </b-list-group>

            <div v-if="reviewFile.news_art_type == 'newspaper'">
              <div v-if="reviewFile.type != 'application'">
                <b-button
                  v-show="
                    $route.name == 'nhap-trang-bao' ||
                    $route.name == 'edit-trang-bao'
                  "
                  variant="primary"
                  class="mt-2"
                  @click="sendInsert"
                >
                  <i class="pi pi-id-card"></i>Chọn Trang Báo</b-button
                >
                <b-button
                  v-show="
                    ($route.hash == '#page-1' &&
                      $route.name == 'nhap-trang-bao') ||
                    $route.name == 'edit-trang-bao'
                  "
                  variant="primary"
                  class="mt-2"
                  @click="sendThummbTrangBao"
                >
                  <i class="pi pi-id-card"></i>Chọn làm thumbnail</b-button
                >
              </div>

              <b-button
                class="mt-2"
                v-if="reviewFile.type == 'application'"
                variant="danger"
                @click="sendDownload"
                ><i class="pi pi-check-circle"></i> Chọn File Download</b-button
              >
            </div>
            <div v-else>
              <b-button
                class="mt-2"
                v-if="reviewFile.type == 'audio'"
                variant="success"
                v-show="handleCheckShowBtn('setthumb')"
                @click="setAudio"
                ><i class="pi pi-check-circle"></i> Set Audio Trang chi
                tiết</b-button
              >
              <b-button class="mt-2" variant="danger" @click="sendData"
                ><i class="pi pi-check-circle"></i> Chọn ảnh đại diện</b-button
              >
              <b-button variant="primary" class="mt-2" @click="sendInsert">
                <i class="pi pi-id-card"></i>Chèn vào nội dung</b-button
              >
            </div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <hr />
    <div class="mt-5">
      <b-pagination
        v-model="currentPage"
        :total-rows="total"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "querystring";
import VideoPlayer from "nuxt-video-player";
import { AxiosAuth } from "../../utils/axios";
import { getPathMedia } from "../../helpers/helpers";
import { DOMAIN_S3 } from "../../helpers/contants";
require("nuxt-video-player/src/assets/css/main.css");
export default {
  components: { VideoPlayer },
  props: {
    showSetThumb: {
      type: Boolean,
      default: true,
    },
    // tabActive: {
    //   type: Number,
    //   default: 1,
    // },
    imgType: {
      type: String,
      default: "newspaper",
    },
    maxImgFile: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      tabActive: 1,
      app_id: "20",
      idIndex: 1,
      listFile: [],
      fileMedia: [],
      listChose: [],
      otherFile: null,
      showLoadfile: false,
      isShow: false,
      isShowBtn: false,
      ishowList: false,
      reviewFile: null,
      tempIndex: null,
      isShowInfoUpload: false,
      enableBtn: false,
      fileSrc: "",
      currentPage: 1,
      perPage: 24,
      total: 0,
      activeType: "",
      img_type: "newspaper",
      proval: 0,
      curSize: "",
      totalSize: "",
    };
  },
  mounted() {
    this.app_id = this.$store.state.app_id;
    this.handleTabIndex(this.tabActive);
  },
  methods: {
    handeBrowfile() {
      this.$refs["inputFile"].$el.click();
    },
    handeBrowfilezip() {
      this.$refs["inputFilezip"].$el.click();
    },
    getResize(path) {
      const result = path.replace(/(\/[0-9]+?\/)/gm, "$1r_220_");
      return getPathMedia(result);
    },
    getPathMedia: getPathMedia,
    getPathMediaType(path, vtype) {
      console.log(vtype);
      let link = "";
      if (vtype == "image") {
        link = this.getPathMedia(path);
      } else if (vtype == "video") {
        link = "/img/video.png";
      } else if (vtype == "audio") {
        link = "/img/audio.png";
      } else {
        link = "/img/winrar.png";
      }
      return link;
    },
    setAudio() {
      this.$emit("sending-setAudio", this.listChose);
    },
    sendData() {
      this.$emit("sending-setThumb", this.listChose);
    },
    sendDownload() {
      this.$emit("sending-setDownload", this.listChose);
    },
    sendInsert() {
      this.$emit("sending-insert", this.listChose);
    },
    sendThummbTrangBao() {
      this.$emit("sending-thumb-trang-bao", this.listChose);
    },
    handleCheckShowBtn(name) {
      return (
        this.$route.name != "resources" && this.$route.name != "nhap-trang-bao"
      );
    },
    handlerAdd(value, key) {
      this.reviewFile = value;
      if (this.$route.name != "resources") {
        if (
          this.$route.name == "nhap-trang-bao" ||
          this.$route.name == "edit-trang-bao"
        ) {
          if (this.listChose.length >= 1) {
            return;
          }
        }

        if (this.listChose.indexOf(value) === -1) {
          this.listChose.push(value);
        } else {
          this.$bvToast.toast("File đã được thêm!", {
            title: `Thông báo`,
            variant: "warning",
            solid: true,
          });
        }
      }

      // console.log(this.listChose)
      // if (this.$route.name != "resources") {
      //   let el = document.getElementById(`checked-img${key}`);
      //   el.classList.toggle("checkimg-show");
      //   let hasClass = el.classList.contains("checkimg-show");
      //   if (hasClass) {
      //     if (this.$route.name == "nhap-trang-bao") {
      //       if (this.listChose.length >= 1) {
      //         el.classList.remove("checkimg-show");
      //       } else {
      //         this.listChose.push(value);
      //       }
      //     } else if (this.$route.name == "nhap-tin") {
      //       this.listChose.push(value);
      //     }
      //   } else {
      //     this.listChose = this.listChose.filter((x) => x.name !== value.name);
      //   }
      // }
    },
    handleTabIndex(id) {
      this.tabActive = id;
      this.img_type = this.imgType;
      if (this.$route.name == "nhap-tin") {
        this.img_type = "article";
      }
      this.idIndex = id;
      let typeRes = "video";
      if (id == 1) {
        typeRes = "image";
      } else if (id == 2) {
        typeRes = "video";
      } else if (id == 3) {
        typeRes = "audio";
      } else {
        this.img_type = "newspaper";
        typeRes = "application";
      }
      this.activeType = typeRes;
      this.fileSrc = "";
      this.fileMedia = [];
      this.proval = 0;
      this.handleLoadRes(typeRes, this.currentPage, this.perPage);
    },
    handleRemoveMedia() {
      this.otherFile = null;
      this.fileSrc = "";
    },
    handleLoadRes(typeRes, page, number) {
      this.reviewFile = null;
      this.isShowBtn = false;
      this.isShowInfoUpload = false;
      let obj = {
        current_page: page,
        total_item: number,
        type: typeRes,
        news_art_type: this.img_type,
        app_id: this.app_id,
      };
      AxiosAuth.post("/api/res-find-all", qs.stringify(obj)).then(
        ({ data: res }) => {
          if (res.status) {
            this.fileMedia = res.data.list;
            this.total = res.data.pagination.total;
          } else {
            this.$bvToast.toast("Không có dữ liệu!", {
              title: `Thông báo`,
              variant: "danger",
              solid: true,
            });
          }
        }
      );
    },

    handleRemove(value) {
      this.listChose = this.listChose.filter((x) => x.id !== value.id);
    },
    handelDelete(id) {
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
          AxiosAuth.post("/api/res-dell", qs.stringify({ id: id }))
            .then(({ data: res }) => {
              if (res.status) {
                this.$bvToast.toast("Xoá thành công", {
                  title: `Thông báo`,
                  variant: "success",
                  solid: true,
                });
                setTimeout(() => {
                  this.handleLoadRes(
                    this.activeType,
                    this.currentPage,
                    this.perPage
                  );
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
    handleExpressUpload(formData) {
      this.proval = 0;
      this.isShowInfoUpload = true;
      this.enableBtn = true;
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
            console.log(res.info);
            // this.handleUploadS3(formData, res.info);
            this.callAPICreateRes(res.info);
          }
        })
        .catch((error) => {
          console.log(error);
          this.isShowInfoUpload = false;
          this.$bvToast.toast("Upload thất bại ! dung lượng quá lớn", {
            title: `Thông báo`,
            variant: "danger",
            solid: true,
          });
        });
    },
    handleUploadS3(formData, resObj) {
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
          this.enableBtn = false;
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
    handleUploadMedia() {
      let formData = new FormData();
      formData.append("file", this.otherFile);
      formData.append("news_art_type", this.img_type);
      this.handleExpressUpload(formData);
    },
    handleUpload() {
      let formData = new FormData();
      formData.append("news_art_type", this.img_type);
      this.listFile.map((v, k) => {
        formData.append("file", v);
      });
      this.handleExpressUpload(formData);
    },
    callAPICreateRes(data) {
      AxiosAuth.post(
        "/api/res-create",
        qs.stringify({
          app_id: this.app_id,
          resources: JSON.stringify(data),
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
              this.handleLoadRes(
                this.activeType,
                this.currentPage,
                this.perPage
              );
              this.enableBtn = false;
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
          this.enableBtn = false;
        });
    },
    handleImages(files) {
      this.listFile = files;
      if (this.listFile.length > 0) {
        this.isShowBtn = true;
      } else {
        this.isShowBtn = false;
      }
    },
  },
  computed: {
    ChuyenTrangDisalbe() {
      // các thuộc tính sẽ disable ở page chuyên trang
      if (
        this.$route.name == "nhap-trang-bao" ||
        this.$route.name == "edit-trang-bao"
      ) {
        return true;
      }
    },
    NhaptinDisalbe() {
      // các thuộc tính sẽ disable ở page nhập tin
      if (this.$route.name == "nhap-tin" || this.$route.name == "quan-ly-tin") {
        return true;
      }
    },
  },
  watch: {
    listChose(val) {
      if (val.length > 0) {
        this.ishowList = true;
      } else {
        this.ishowList = false;
      }
    },
    otherFile(val) {
      this.fileSrc = "";
      this.showLoadfile = true;
      setTimeout(() => {
        this.showLoadfile = false;
        if (val != null && val.type != "application/x-zip-compressed") {
          this.fileSrc = URL.createObjectURL(val);
        } else {
          this.fileSrc = val;
        }
      }, 1000);
    },
    currentPage(val) {
      this.handleLoadRes(this.activeType, val, this.perPage);
    },
    img_type(val) {
      this.fileMedia = [];
      this.handleLoadRes("image", this.currentPage, this.perPage);
    },
    app_id(val) {
      this.fileMedia = [];
      this.handleTabIndex(this.tabActive);
    },
  },
};
</script>

<style scoped>
.box-upload-img {
  background: #f7fafc;
  border: 0.1px solid #a3a8b1;
  border-radius: 12px;
}
.box-img .img-tool {
  opacity: 0;
}
.box-img:hover .img-tool {
  opacity: 1;
}
.img-card {
  height: 180px;
  object-fit: contain;
}
.card-review {
  position: sticky;
  top: 90px;
}

.img-tool {
  position: absolute;
  left: 15px;
  cursor: pointer;
  top: 10px;
}

.info-img {
  font-size: 11px;
  font-style: italic;
}
.sp-remove {
  float: right;
  background: #495057;
}
.sp-remove:hover {
  cursor: pointer;
  background: red;
}
.input-textinfo {
  width: 100%;
  border: none;
  background: #ffffff;
}
</style>
