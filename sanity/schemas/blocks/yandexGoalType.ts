import { defineType } from "sanity";

export const yandexGoal = defineType({
  name: "yandexGoal",
  title: "Yandex.Metrica цель",
  type: "string",
  description:
    "Укажите идентификатор цели из Яндекс.Метрики (например: schet1, leadForm, orderComplete).",
});
