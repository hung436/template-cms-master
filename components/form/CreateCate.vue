<template>
  <div>
    <b-row>
      <b-col :sm="onlyCreateCate == true ? 12 : 3">
        <b-form-group
          class="mt-1 label-input err-form"
          label="Tên Chuyên trang"
          :description="errName"
        >
          <b-form-input
            type="text"
            class="input-value"
            v-model="name"
            placeholder="Nhập Tên Chuyên trang"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="mt-1 label-input err-form"
          label="Chọn Loại Báo"
        >
          <b-form-select
            class="input-value"
            v-model="newsType"
            :options="newsTypeSelect"
          ></b-form-select>
        </b-form-group>

        <b-form-group class="mt-1 label-input err-form" label="Slug">
          <b-form-input
            disabled
            type="text"
            class="input-value"
            v-model="slug"
            placeholder="slug"
          ></b-form-input>
        </b-form-group>
        <br />
        <b-button variant="primary" @click="handleCreate">Tạo</b-button>
      </b-col>
    </b-row>
  </div>
</template>
  
  <script>
import { AxiosAuth } from "../../utils/axios";
import { to_slug } from "../../helpers/helpers";
import qs from "querystring";
export default {
  props: {
    onlyCreateCate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: "",
      errName: "",
      slug: "",
      newsType: "20",
      newsTypeSelect: [
        { value: "20", text: "Báo ngày" },
        { value: "15", text: "Tuổi Trẻ Cười" },
        { value: "19", text: "Tuổi Trẻ Cuối Tuần" },
      ],
    };
  },
  methods: {
    handleCreate() {
      let _this = this;
      _this.errName =
        _this.name.length == 0 ? "Chưa nhập tên Chuyên trang" : "";
      if (_this.errName.length == 0) {
        AxiosAuth.post(
          "/api/create-cate",
          qs.stringify({ name: _this.name ,app_id: this.newsType})
        ).then(({ data: res }) => {
          if (res.status) {
            _this.$bvToast.toast("Tạo tên chuyên trang thành công !", {
              title: `Thông báo`,
              variant: "success",
              solid: true,
            });
            setTimeout(() => {
              _this.$emit("reload", true);
            }, 2000);
          } else {
            _this.$bvToast.toast("Đã có lỗi xảy ra!", {
              title: `Thông báo`,
              variant: "danger",
              solid: true,
            });
          }
        });
      }
    },
  },
  watch: {
    name(val) {
      this.slug = to_slug(val);
    },
  },
};
</script>
  
  <style scoped>
.err-form small.text-muted {
  color: red !important;
}
</style>