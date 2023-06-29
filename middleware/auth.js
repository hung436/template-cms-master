import { DOMAIN_API } from "../helpers/contants";
export default function ({ store, redirect }) {
  console.log(process.env.NODE_ENV);
  // If the user is authenticated redirect to home page
  if (!store.state.token) {
    console.log("K token");
    return redirect(
      `https://erp-staging.tuoitre.vn/login?redirect_url=${DOMAIN_API}`
    );
  }
}
