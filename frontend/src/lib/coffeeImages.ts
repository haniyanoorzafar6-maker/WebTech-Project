import icedLatte from "@/assets/generated/coffee-iced-latte.png";
import pinkCloudMocha from "@/assets/generated/coffee-pink-cloud-mocha.png";
import classicAmericano from "@/assets/generated/coffee-classic-americano.png";
import saffronCappuccino from "@/assets/generated/coffee-saffron-cappuccino.png";
import vanillaColdBrew from "@/assets/generated/coffee-vanilla-cold-brew.png";
import saltedCaramelLatte from "@/assets/generated/coffee-salted-caramel-latte.png";
import espressoShot from "@/assets/generated/coffee-espresso-shot.png";
import honeyCinnamonFlatWhite from "@/assets/generated/coffee-honey-cinnamon-flat-white.png";
import rosePistachio from "@/assets/generated/coffee-rose-pistachio.png";
import darkMocha from "@/assets/generated/coffee-dark-mocha.png";
import hazelnutMacchiato from "@/assets/generated/coffee-hazelnut-macchiato.png";
import midnightBlackBrew from "@/assets/generated/coffee-midnight-black-brew.png";

const coffeeImages: Record<number, string> = {
  1: icedLatte,
  2: pinkCloudMocha,
  3: classicAmericano,
  4: saffronCappuccino,
  5: vanillaColdBrew,
  6: saltedCaramelLatte,
  7: espressoShot,
  8: honeyCinnamonFlatWhite,
  9: rosePistachio,
  10: darkMocha,
  11: hazelnutMacchiato,
  12: midnightBlackBrew
};

export function getCoffeeImage(coffeeId: number) {
  return coffeeImages[coffeeId] ?? icedLatte;
}
