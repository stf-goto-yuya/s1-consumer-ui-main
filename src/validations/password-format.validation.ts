import { REGEX_PASSWORD } from "@/src/utils/regex";

export const passwordFormatValidation = {
  value: REGEX_PASSWORD,
  message:
    '数字、英字小文字、英字大文字、特殊文字(!@;:#+*?,.)それぞれ３つ一文字以上、全体で10文字以上必須です',
}
