<template>
  <div class="form-input">
    <b-form-group id="fieldset-chose" content-cols-lg="7" label="Chọn loại báo">
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
        v-model="selected"
        :options="options"
      ></b-form-select>
    </b-form-group>

    <b-form-group content-cols-lg="7" label="Tên chuyên trang">
      <b-form-tags v-model="specailized" :limit="1" placeholder="Thêm tên chuyên trang" add-button-text="Thêm" limit-tags-text="" remove-on-delete></b-form-tags>
    </b-form-group>

    <b-form-group content-cols-lg="7" label="Số trang">
      <b-form-input
        type="number"
        class="input-value"
        v-model="numberPage"
        placeholder=""
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
import { SPECIALIZED_PAGE } from "../../helpers/contants";
export default {
  data() {
    return {
      inputdate: "",
      date: "",
      numberPage: 1,
      selected: "red",
      options: [
        { value: "red", text: "Đỏ" },
        { value: "blue", text: "xanh" },
      ],
      specailized: [],
      specailizedSelect: SPECIALIZED_PAGE,
      newsType: "bao-ngay",
      newsTypeSelect: [{ value: "bao-ngay", text: "Báo ngày" }],
    };
  },
  methods: {
    onContext(ctx) {
      if(ctx.selectedDate == null){
        this.inputdate = ctx.activeFormatted
      }else{
        this.inputdate = ctx.selectedFormatted;
      }
    },
  },
};
</script>

<style scoped>
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
</style>