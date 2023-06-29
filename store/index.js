/*
 * ROOT STORE
 * initial page (check login, get list for homepage )
 * get list term
 * get TTO news
 * */

const cookieParser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
import { AxiosAuth } from "../utils/axios";
import { AxiosApiCMS } from "../api/axios";
import { deScript } from "../helpers/auth-header";
import qs from "querystring";
import { to_slug, IsAllowRole } from "../helpers/helpers";
import { NEWSPAPER, ARTICLE } from "../helpers/contants";
export const state = () => ({
  auth: null,
  token: null,
  codeReview: "",
  isAllowRole: false,
  listCate: [],
  listNewspaper: [],
  listPageToday: [],
  totalPage: 0,
  listArticle: [],
  totalArticle: 0,
  allErr: null,
  app_id: 20,
});

export const mutations = {
  setAuth(state, payload) {
    state.auth = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setCodeReview(state, payload) {
    state.codeReview = payload;
  },
  setIsAllowRole(state, payload) {
    state.isAllowRole = payload;
  },
  setlistCate(state, payload) {
    state.listCate = payload;
  },
  setlistNewSpaper(state, payload) {
    state.listNewspaper = payload;
  },
  setlistPageToday(state, payload) {
    state.listPageToday = payload;
  },
  setlistArticle(state, payload) {
    state.listArticle = payload;
  },
  setTotalPage(state, payload) {
    state.totalPage = payload;
  },
  setTotalArticle(state, payload) {
    state.totalArticle = payload;
  },
  setAllError(state, payload) {
    state.allErr = payload;
  },
  setAppID(state, payload) {
    state.app_id = payload;
  },
};
export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie);
      console.log(parsed);
      let token = parsed["_ttoauth_stag"];
      console.log(token);
      if (token) {
        await dispatch("checkAuthBySlug", { token });
      }
    }
  },
  async checkAuthBySlug({ commit, dispatch }, { token }) {
    const { data } = await AxiosAuth.post(
      "/api/check-auth-by-slug",
      qs.stringify({ token: token })
    );
    commit("setAllError", data);
    if (data.success && data.roles.length > 0) {
      let pos_name = to_slug(data.info.pos_name);
      let ArrInfo = data.info;
      data.roles.map((v, k) => {
        if (v.slug === pos_name) {
          ArrInfo.roles = v;
        }
      });
      commit("setAuth", ArrInfo);
      commit("setToken", token);
    } else {
    }
  },
  async handleLoadCate({ commit, dispatch }, { page, number }) {
    const { data } = await AxiosAuth.post(
      "/api/find-cate",
      qs.stringify({ current_page: page, total_item: number })
    );
    if (data.status) {
      commit("setlistCate", data.data.list);
    }
  },
  async handleLoadNewsSpaper({ commit, dispatch }, { curent_day, app_id }) {
    commit("setlistPageToday", []);
    commit("setlistNewSpaper", []);
    const { data } = await AxiosAuth.post(
      "/api/find-newspaper",
      qs.stringify({
        app_id: app_id,
        published_at: curent_day,
        current_page: 1,
        total_item: 20,
      })
    );
    if (data.status) {
      let arr_page = [];
      data.data.list.map((v, k) => {
        arr_page.push(v.page_number);
      });
      commit("setlistPageToday", arr_page);
      commit("setlistNewSpaper", data.data.list);
      commit("setTotalPage", data.data.pagination.total);
    } else {
      commit("setlistNewSpaper", []);
      commit("setTotalPage", 0);
    }
  },
  async handleLoadArticle({ commit, dispatch }, { curent_day, app_id }) {
    const { data } = await AxiosAuth.post(
      "/api/find-article",
      qs.stringify({
        app_id: app_id,
        published_at: curent_day,
        current_page: 1,
        total_item: 20,
      })
    );
    if (data.status) {
      commit("setlistArticle", data.data.list);
      commit("setTotalArticle", data.data.pagination.total);
    } else {
      commit("setlistArticle", []);
      commit("setTotalArticle", 0);
    }
  },
  NewSpaperAction: ({ commit, dispatch, state }, submit_action) => {
    let isAllow = IsAllowRole(
      state.auth.roles.children,
      submit_action.action_name
    );
    commit("setIsAllowRole", isAllow);
    if (isAllow) {
      switch (submit_action.action_name) {
        case NEWSPAPER.CREATE:
          break;
        case NEWSPAPER.DEL:
          break;
        case NEWSPAPER.EDIT:
          break;
        case NEWSPAPER.FIND:
          break;
        case NEWSPAPER.FIND_ONE:
          break;
        default:
          console.log("nothing sumit");
          break;
      }
    }
  },
  ArticleAction: ({ commit, dispatch, state }, submit_action) => {
    let isAllow = IsAllowRole(
      state.auth.roles.children,
      submit_action.action_name
    );
    if (isAllow) {
      switch (submit_action.action_name) {
        case ARTICLE.CREATE:
          dispatch("ArticleCreate", submit_action.obj);
          break;
        case ARTICLE.DEL:
          break;
        case ARTICLE.EDIT:
          break;
        case ARTICLE.FIND:
          break;
        case ARTICLE.FIND_ONE:
          break;
        default:
          console.log("nothing sumit");
          break;
      }
    }
  },
  ArticleCreate({ commit, dispatch, state }, obj) {
    obj.token = state.token;
    return new Promise((resolve, reject) => {
      AxiosAuth.post(`/api/create-article`, qs.stringify(obj))
        .then(({ data: res }) => {
          if (res.data.success) resolve(res.data);
          else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject();
        });
    });
  },
};
