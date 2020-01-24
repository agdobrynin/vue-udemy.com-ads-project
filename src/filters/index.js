import Vue from "vue";
import dateLocale from "@/filters/dateLocale";
import {nl2br} from "@/filters/textFormater";

Vue.filter("dateLocale",dateLocale);
Vue.filter("nl2br", nl2br);
