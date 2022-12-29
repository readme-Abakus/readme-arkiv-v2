const HOME = "/";
const EDITION = "/edition/:id.pdf";
const SEARCH = "/search";
const ADMIN = "/admin";
const SIGN_IN = "/signin";
const PASSWORD_FORGET = "/pw-forget";
const NEW_EDITION = ADMIN + "/new_edition";
const EDITION_LIST = ADMIN + "/editions";
const ARTICLE_LIST = ADMIN + "/articles";
const NEW_ARTICLE = ARTICLE_LIST + "/new";
const EDIT_ARTICLE = ARTICLE_LIST + "/:id";

export const ROUTES = {
  HOME,
  EDITION,
  SEARCH,
  ADMIN,
  SIGN_IN,
  PASSWORD_FORGET,
  NEW_EDITION,
  NEW_ARTICLE,
  EDIT_ARTICLE,
  EDITION_LIST,
  ARTICLE_LIST,
};
