const platformList = ["PlayStation4", "Xbox One", "Nintendo Switch"];

const languageList = ["中文", "英文", "日文"];

const gameTypeList = [
  "动作",
  "冒险",
  "射击",
  "格斗",
  "音乐",
  "益智",
  "竞速",
  "角色扮演",
  "即时战略",
  "模拟",
  "体育"
];

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];

export { platformList, languageList, gameTypeList, toolbarOptions };
