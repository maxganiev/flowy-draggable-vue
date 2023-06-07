import { User } from "../lib/constructors/User";
import { Block } from "../lib/constructors/Block";
import { Tag } from "../lib/constructors/Tag";

/**
 *
 * id кастомных блоков (которые добавляет пользователь по желанию):
 * 1000001 - Казначейство
 * 1000002 - Финансовый блок
 */

export const getUsersScheme = () =>
  new Promise((resolve) => {
    const usersScheme = [
      new User(
        -1,
        368,
        53,
        "Елена Гуляева",
        "uploads/other/2017-10-27_15-34-14_%D0%B3%D1%83%D0%BB%D1%8F%D0%B5%D0%B2%D0%B0.JPG",
        "Руководитель ФЭО",
        null,
        0,
        [new Tag(0, "ФЭО")]
      ),
      new User(
        368,
        2713,
        53,
        "Ольга Башарина",
        "uploads/other/2022-09-27_13-31-22_фото1_thumb.jpg",
        "Ассистент руководителя",
        "<p>Поддержка деятельности руководителя (Гуляевой Е.А.)</p>",
        200,
        [new Tag(0, "Ассистент"), new Tag(1, "ФЭО")]
      ),
      new User(
        368,
        555,
        53,
        "Ганжа Галина",
        "uploads/other/2017-10-20_09-14-56_%D0%B3%D0%B0%D0%BD%D0%B6%D0%B0.jpg",
        "Заместитель руководителя финансово-экономического отдела (по вопросам финансового блока)",
        '<p class="a" style="margin-bottom: 9.9pt;"><span style="font-family: \'Times New Roman\',\'serif\';">- Замещение руководителя ФЭО по вопросам финансового блока.</span></p>\n<p class="a" style="margin-bottom: 9.9pt;"><span style="font-family: \'Times New Roman\',\'serif\';">- Координация и контроль работы сотрудников финансового блока.</span></p>\n<p class="a" style="margin-bottom: 9.9pt;"><span style="font-family: \'Times New Roman\',\'serif\';">- Контроль ведения управленческого учета.</span></p>\n<p class="MsoNormal" style="margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;">- Формирование управленческой отчетности.</span></p>\n<p><span style="font-size: 12pt; font-family: \'Times New Roman\', \'serif\';">- Анализ финансово-экономической деятельности компании.</span></p>',
        100,
        []
      ),
      new Block(555, 1000001, "Казначейство", 200),
      new User(
        1000001,
        2096,
        53,
        "Вестильян Марина",
        "uploads/other/2021-10-05_09-29-01_%D1%84%D0%BE%D1%82%D0%BE_thumb.jpg",
        "Финансовый менеджер",
        `<p class="MsoNormal" style="margin-bottom: 9.9pt;"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: Calibri; mso-fareast-language: RU; mso-bidi-language: AR-SA;">- </span><span style="font-family: \'Times New Roman\',\'serif\';">Руководство подразделением Казначейство.</span></p>\n<p class="MsoNormal" style="margin-bottom: 9.9pt;"><span style="font-family: \'Times New Roman\',\'serif\';">-<span style="mso-spacerun: yes;">&nbsp; </span>Общие вопросы по платежам</span></p>\n<table class="MsoNormalTable" style="border-collapse: collapse; mso-table-layout-alt: fixed; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;" border="0" cellspacing="0" cellpadding="0">\n<tbody>\n<tr style="mso-yfti-lastrow: yes; height: 15.0pt;">\n<td style="width: 589.25pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;" valign="bottom" width="786">\n<p class="MsoNormal" style="margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;">- Оформление и сопровождение кредитов, </span></p>\n<p class="MsoNormal" style="margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;">банковских гарантий &ndash; Памятка </span><a href="#/doc/3142"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;">#/doc/3142</span></a></p>\n<p class="MsoNormal" style="margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Образцы БГ </span><a href="#/doc/3143"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;">#/doc/3143</span></a></p>\n<p class="MsoNormal" style="margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Заявка на выпуск БГ </span><a href="#/doc/3144"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;">#/doc/3144</span></a></p>\n<p class="MsoNormal" style="margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;">аккредитивов, </span><a href="#/letter-of-credit"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;">#/letter-of-credit</span></a></p>\n<p class="MsoNormal" style="margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;">лизинг </span><a href="#/doc/2853"><span style="font-family: \'Times New Roman\',\'serif\'; mso-fareast-font-family: \'Times New Roman\'; mso-fareast-language: RU; mso-bidi-language: AR-SA;">#/doc/2853</span></a></p>\n</td>\n</tr>\n</tbody>\n</table>`,
        100,
        []
      ),
      new User(
        1000001,
        124,
        53,
        "Богатикова Марина",
        "uploads/other/2020-02-26_13-06-25_%D0%91%D0%BE%D0%B3%D0%B0%D1%82%D0%B8%D0%BA%D0%BE%D0%B2%D0%B0_thumb.jpg",
        "Ведущий финансовый менеджер",
        '<table class="MsoNormalTable" style="border-collapse: collapse; mso-table-layout-alt: fixed; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;" border="0" cellspacing="0" cellpadding="0">\n<tbody>\n<tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes; height: 15.0pt;">\n<td style="width: 568.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;" valign="bottom" width="757">\n<p class="MsoNormal" style="margin-bottom: 9.9pt; mso-pagination: widow-orphan; punctuation-wrap: hanging;"><span style="font-family: \'Times New Roman\',\'serif\';">- Обработка счетов на оплату и создание платежных поручений в БУХте</span></p>\n</td>\n</tr>\n<tr style="mso-yfti-irow: 1; mso-yfti-lastrow: yes; height: 15.0pt;">\n<td style="width: 568.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;" valign="bottom" width="757">\n<p class="MsoNormal" style="margin-bottom: 9.9pt;"><span style="font-family: \'Times New Roman\',\'serif\';">- Обработка банковских выписок </span></p>\n<p style="margin: 2.85pt 0cm 2.85pt 0cm;"><span style="mso-bidi-font-family: Calibri;">- </span>Зачет авансов после 14:00</p>\n</td>\n</tr>\n</tbody>\n</table>',
        0,
        []
      ),
      new Block(555, 1000002, "Финансовый блок", 0),
      new User(
        1000002,
        207,
        53,
        "Астаев Юрий",
        "uploads/other/2023-02-21_12-54-22_4AFEFE1C-C765-4A69-916E-3553B54C8012_thumb.jpeg",
        "Финансовый аналитик",
        "<p class=\"MsoNormal\" style=\"margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;\"><span style=\"font-family: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: RU; mso-bidi-language: AR-SA;\">- Формирование бюджета компании (сбор и консолидация информации).</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;\"><span style=\"font-family: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: RU; mso-bidi-language: AR-SA;\">- Контроль за выполнением бюджета продаж, валовой наценки.</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;\"><span style=\"font-family: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: RU; mso-bidi-language: AR-SA;\">- Добавление в БУХту Бюджетных групп, групп КП.</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;\"><span style=\"font-family: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: RU; mso-bidi-language: AR-SA;\">- Формирование отчетов по наценке, оборачиваемости, исполнении бюджета. </span></p>\n<p><span style=\"font-size: 12pt; font-family: 'Times New Roman', 'serif';\">- Формирование аналитических отчетов о статистике продаж (по клиентам, направлениям и пр.) по запросам.&nbsp;</span></p>",
        0,
        []
      ),
      new User(
        1000002,
        1112,
        53,
        "Бакиева Фируза",
        "uploads/other/2019-04-16_14-50-23_bakieva_thumb.jpg",
        "Бухгалтер",
        `<table class=\"MsoNormalTable\" style=\"border-collapse: collapse; mso-table-layout-alt: fixed; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr style=\"mso-yfti-irow: 0; mso-yfti-firstrow: yes; height: 15.0pt;\">\n<td style=\"width: 426.25pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" valign=\"bottom\" width=\"568\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;\"><span style=\"font-family: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: RU; mso-bidi-language: AR-SA;\">- Управленческий учет в БУХте расходов филиала Алматы.</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 1; height: 15.0pt;\">\n<td style=\"width: 426.25pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" valign=\"bottom\" width=\"568\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;\"><span style=\"font-family: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: RU; mso-bidi-language: AR-SA;\">- Обработка банковских выписок КХТ.</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 2; height: 15.0pt;\">\n<td style=\"width: 426.25pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" valign=\"bottom\" width=\"568\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;\"><span style=\"font-family: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: RU; mso-bidi-language: AR-SA;\">- Выпуск банковских гарантий для тендеров в Казахстане.</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 3; height: 15.0pt;\">\n<td style=\"width: 426.25pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 15.0pt;\" valign=\"bottom\" width=\"568\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;\"><span style=\"font-family: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: RU; mso-bidi-language: AR-SA;\">- Оформление экспорта из Казахстана в РФ и Киргизию.</span></p>\n</td>\n</tr>\n<tr style=\"mso-yfti-irow: 4; mso-yfti-lastrow: yes; height: 16.8pt;\">\n<td style=\"width: 426.25pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 16.8pt;\" valign=\"bottom\" width=\"568\">\n<p class=\"MsoNormal\" style=\"margin-bottom: 9.9pt; mso-pagination: widow-orphan; mso-hyphenate: auto; punctuation-wrap: hanging;\"><span style=\"font-family: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: RU; mso-bidi-language: AR-SA;\">- Создание 310 счетов на оплату командировочных расходов (по филиалу АЛА (КХТ)). </span></p>\n</td>\n</tr>\n</tbody>\n</table>`,
        0,
        []
      ),
    ];

    setTimeout(() => {
      //resolve(usersScheme);
      resolve([]);
    }, 200);
  });
