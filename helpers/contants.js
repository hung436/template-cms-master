export const timeoutSweetAlert = 1500;
export const NEWSPAPER = {
  CREATE: "create-newspaper",
  DEL: "delete-one-by-id",
  EDIT: "edit-newspaper",
  FIND: "find-newspaper",
  FIND_ONE: "find-one-by-id",
};
export const ARTICLE = {
  CREATE: "create-article",
  DEL: "delete-one-by-id",
  EDIT: "edit-article",
  FIND: "find-article",
  FIND_ONE: "find-one-by-id",
};
export const RESOURCE = {
  CREATE: "create-resource",
  DEL: "delete-one-by-id",
  FIND: "find-all",
  FIND_ONE: "find-one-by-id",
};
export const USER = {
  CREATE: "add-slug-name",
  DEL: "delete-one-by-id",
  FIND: "find-all-slug",
  FIND_ONE: "find-one-by-id",
  FIND_ALL_ACTION: "find-all-action",
  ADD_SLUG_ACTION: "add-slug-action",
  DEL_SLUG_ACTION: "delete-slug-action",
};

export const SPECIALIZED_PAGE = [
  { value: 1, text: "Thời sự" },
  { value: 2, text: "Kinh tế" },
  { value: 3, text: "Phóng sự ảnh" },
  { value: 4, text: "Bạn đọc & Tuổi Trẻ" },
  { value: 5, text: "Nhịp sống trẻ" },
  { value: 6, text: "Giáo dục" },
  { value: 7, text: "Tổ ấm" },
  { value: 8, text: "Thể thao" },
  { value: 9, text: "Cuộc sống quanh ta" },
  { value: 10, text: "Thông tin doanh nghiệp" },
  { value: 11, text: "Đối thoại cùng Tuổi Trẻ" },
  { value: 12, text: "Văn hóa gia đình" },
];
// lOCAL
export const DOMAIN_API = "http://localhost:8000";
export const DOMAIN_CMS = "http://api-newspaper.tuoitre.vn";
export const DOMAIN_RES = "https://devstatic-newspaper.tuoitre.vn";
// export const DOMAIN_API =  process.env.DOMAIN_API
// export const DOMAIN_CMS =  process.env.DOMAIN_CMS
// export const DOMAIN_RES =  process.env.DOMAIN_RES
export const DOMAIN_S3 =
  "https://ec2-52-199-77-183.ap-northeast-1.compute.amazonaws.com";
// DEV
// export const DOMAIN_API =  "https://dev-nbcms.tuoitre.vn"
// export const DOMAIN_CMS =  "http://api-newspaper.tuoitre.vn"
// export const DOMAIN_RES =  "https://devstatic-newspaper.tuoitre.vn"
// PRO
// export const DOMAIN_API = "https://nbcms.tuoitre.vn"
// export const DOMAIN_CMS = "https://api-nbbe.tuoitre.vn"
// export const DOMAIN_RES = "https://static-newspaper.tuoitre.vn"
