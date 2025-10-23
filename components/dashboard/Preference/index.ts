import { PreferenceManager } from "./Manager";
import ColorPalette from "./ColorPalette";
import FlowerTypes from "./FlowerTypes";
import BouquetInfo from "./BouquetInfo";
import Allergies from "./Allergies";
import Delivery from "./Delivery";
import Account from "./Account";

const CompoundPreferenceManager = Object.assign(PreferenceManager, {
  ColorPalette,
  FlowerTypes,
  BouquetInfo,
  Allergies,
  Delivery,
  Account,
});

export default CompoundPreferenceManager;
