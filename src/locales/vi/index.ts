import { viVN_Promotion } from "./promotion";
import { viVN_sideBar } from "./sideBar";
import { viVN_Transaction } from "./transaction";
const vi_VN = {
  ...viVN_sideBar,
  ...viVN_Transaction,
  ...viVN_Promotion
};
export default vi_VN;
