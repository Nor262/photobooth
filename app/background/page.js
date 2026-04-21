"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import { ArrowLeft, Download, Share, Calendar, Plus, Sliders, Move, Trash, Trash2, MousePointer, Palette, Maximize, Minimize, Image, FileImage, Sticker, Pencil, Eraser, RotateCcw, X, FlipHorizontal } from "lucide-react";
import html2canvas from 'html2canvas';
import NextImage from "next/image"; // Import Next.js Image component

// Large collection of emojis for stickers
const ALL_EMOJIS = [
  // Smileys & Emotion
  { char: "😀", name: "grinning" }, { char: "😃", name: "smile" }, { char: "😄", name: "happy" }, { char: "😁", name: "grin" },
  { char: "😆", name: "laughing" }, { char: "😅", name: "sweat smile" }, { char: "🤣", name: "rofl" }, { char: "😂", name: "joy" },
  { char: "🙂", name: "slightly smile" }, { char: "🙃", name: "upside down" }, { char: "😉", name: "wink" }, { char: "😊", name: "blush" },
  { char: "😇", name: "halo" }, { char: "🥰", name: "heart eyes" }, { char: "😍", name: "heart eyes" }, { char: "🤩", name: "star struck" },
  { char: "😘", name: "kiss" }, { char: "😗", name: "kissing" }, { char: "😚", name: "kissing" }, { char: "😙", name: "kissing" },
  { char: "😋", name: "yum" }, { char: "😛", name: "tongue" }, { char: "😜", name: "wink tongue" }, { char: "🤪", name: "zany" },
  { char: "😝", name: "squint tongue" }, { char: "🤑", name: "money" }, { char: "🤗", name: "hug" }, { char: "🤭", name: "shushing" },
  { char: "🥱", name: "yawning" }, { char: "🤫", name: "quiet" }, { char: "🤔", name: "thinking" }, { char: "🤐", name: "zipper" },
  { char: "🤨", name: "eyebrow" }, { char: "😐", name: "neutral" }, { char: "😑", name: "expressionless" }, { char: "😶", name: "no mouth" },
  { char: "😏", name: "smirk" }, { char: "😒", name: "unamused" }, { char: "🙄", name: "rolling eyes" }, { char: "😬", name: "grimace" },
  { char: "🤥", name: "liar" }, { char: "😌", name: "relieved" }, { char: "😔", name: "pensive" }, { char: "😪", name: "sleepy" },
  { char: "😴", name: "sleeping" }, { char: "😷", name: "mask" }, { char: "🤒", name: "fever" }, { char: "🤕", name: "bandage" },
  { char: "🤢", name: "nauseated" }, { char: "🤮", name: "vomit" }, { char: "🤧", name: "sneeze" }, { char: "🥵", name: "hot" },
  { char: "🥶", name: "cold" }, { char: "🥴", name: "woozy" }, { char: "😵", name: "dizzy" }, { char: "🤯", name: "explode" },
  { char: "🤠", name: "cowboy" }, { char: "🥳", name: "party" }, { char: "😎", name: "cool" }, { char: "🤓", name: "nerd" },
  { char: "🧐", name: "monocle" }, { char: "😕", name: "confused" }, { char: "😟", name: "worried" }, { char: "🙁", name: "frown" },
  { char: "😮", name: "open mouth" }, { char: "😯", name: "hushed" }, { char: "😲", name: "astonished" }, { char: "😳", name: "flushed" },
  { char: "🥺", name: "pleading" }, { char: "😦", name: "frowning" }, { char: "😧", name: "anguished" }, { char: "😨", name: "fearful" },
  { char: "😰", name: "anxious" }, { char: "😥", name: "sad sweat" }, { char: "😢", name: "cry" }, { char: "😭", name: "sob" },
  { char: "😱", name: "scared" }, { char: "😖", name: "confounded" }, { char: "😣", name: "persevere" }, { char: "😞", name: "disappointed" },
  { char: "😓", name: "sweat" }, { char: "😩", name: "weary" }, { char: "😫", name: "tired" }, { char: "🥱", name: "yawn" },
  { char: "😤", name: "triumph" }, { char: "😡", name: "rage" }, { char: "😠", name: "angry" }, { char: "🤬", name: "curse" },
  { char: "😈", name: "devil" }, { char: "👿", name: "devil" }, { char: "💀", name: "skull" }, { char: "💩", name: "poop" },
  { char: "🤡", name: "clown" }, { char: "👹", name: "ogre" }, { char: "👺", name: "goblin" }, { char: "👻", name: "ghost" },
  { char: "👽", name: "alien" }, { char: "👾", name: "game" }, { char: "🤖", name: "robot" }, { char: "😺", name: "cat" },
  { char: "😸", name: "cat" }, { char: "😻", name: "cat heart" }, { char: "😼", name: "cat smirk" }, { char: "😽", name: "cat kiss" },
  { char: "🙀", name: "cat scream" }, { char: "😿", name: "cat cry" }, { char: "😾", name: "cat angry" },
  // Hearts & Symbols
  { char: "💘", name: "heart arrow" }, { char: "💝", name: "heart gift" }, { char: "💖", name: "sparkle heart" }, { char: "💗", name: "grow heart" },
  { char: "💓", name: "beat heart" }, { char: "💞", name: "revolve heart" }, { char: "💕", name: "two hearts" }, { char: "💟", name: "heart deco" },
  { char: "❣️", name: "heart bang" }, { char: "💔", name: "broken heart" }, { char: "❤️", name: "red heart" }, { char: "🧡", name: "orange heart" },
  { char: "💛", name: "yellow heart" }, { char: "💚", name: "green heart" }, { char: "💙", name: "blue heart" }, { char: "💜", name: "purple heart" },
  { char: "🤎", name: "brown heart" }, { char: "🖤", name: "black heart" }, { char: "🤍", name: "white heart" }, { char: "💯", name: "100" },
  { char: "💢", name: "anger" }, { char: "💥", name: "boom" }, { char: "💫", name: "dizzy" }, { char: "💦", name: "splat" },
  { char: "💨", name: "dash" }, { char: "🕳️", name: "hole" }, { char: "💣", name: "bomb" }, { char: "💬", name: "speech" },
  { char: "👁️‍🗨️", name: "eye speech" }, { char: "🗨️", name: "speech" }, { char: "🗯️", name: "shout" }, { char: "💭", name: "thought" },
  { char: "💤", name: "zzz" },
  // Animals & Nature
  { char: "🙈", name: "monkey see" }, { char: "🙉", name: "monkey hear" }, { char: "🙊", name: "monkey speak" }, { char: "🐒", name: "monkey" },
  { char: "🦍", name: "gorilla" }, { char: "🦧", name: "orangutan" }, { char: "🐶", name: "dog" }, { char: "🐕", name: "dog" },
  { char: "🦮", name: "guide dog" }, { char: "🐩", name: "poodle" }, { char: "🐺", name: "wolf" }, { char: "🦊", name: "fox" },
  { char: "🦝", name: "raccoon" }, { char: "🐱", name: "cat" }, { char: "🐈", name: "cat" }, { char: "🦁", name: "lion" },
  { char: "🐯", name: "tiger" }, { char: "🐅", name: "tiger" }, { char: "🐆", name: "leopard" }, { char: "🐴", name: "horse" },
  { char: "🐎", name: "horse" }, { char: "🦄", name: "unicorn" }, { char: "🦓", name: "zebra" }, { char: "🦌", name: "deer" },
  { char: "🐮", name: "cow" }, { char: "🐂", name: "ox" }, { char: "🐃", name: "buffalo" }, { char: "🐄", name: "cow" },
  { char: "🐷", name: "pig" }, { char: "🐖", name: "pig" }, { char: "🐗", name: "boar" }, { char: "🐽", name: "pig nose" },
  { char: "🐏", name: "ram" }, { char: "🐑", name: "sheep" }, { char: "🐐", name: "goat" }, { char: "🐪", name: "camel" },
  { char: "🐫", name: "camel" }, { char: "🦙", name: "llama" }, { char: "🦒", name: "giraffe" }, { char: "🐘", name: "elephant" },
  { char: "🦏", name: "rhino" }, { char: "🦛", name: "hippo" }, { char: "🐭", name: "mouse" }, { char: "🐁", name: "mouse" },
  { char: "🐀", name: "rat" }, { char: "🐹", name: "hamster" }, { char: "🐰", name: "rabbit" }, { char: "🐇", name: "rabbit" },
  { char: "🐿️", name: "chipmunk" }, { char: "🦔", name: "hedgehog" }, { char: "🦇", name: "bat" }, { char: "🐻", name: "bear" },
  { char: "🐨", name: "koala" }, { char: "🐼", name: "panda" }, { char: "🦥", name: "sloth" }, { char: "🦦", name: "otter" },
  { char: "🦨", name: "skunk" }, { char: "🦘", name: "kangaroo" }, { char: "🦡", name: "badger" }, { char: "🐾", name: "paw" },
  { char: "🦃", name: "turkey" }, { char: "🐔", name: "chicken" }, { char: "🐓", name: "rooster" }, { char: "🐣", name: "chick" },
  { char: "🐤", name: "chick" }, { char: "🐥", name: "chick" }, { char: "🐦", name: "bird" }, { char: "🐧", name: "penguin" },
  { char: "🕊️", name: "dove" }, { char: "🦅", name: "eagle" }, { char: "🦆", name: "duck" }, { char: "🦢", name: "swan" },
  { char: "🦉", name: "owl" }, { char: "🦩", name: "flamingo" }, { char: "🦚", name: "peacock" }, { char: "🦜", name: "parrot" },
  { char: "🐸", name: "frog" }, { char: "🐊", name: "crocodile" }, { char: "🐢", name: "turtle" }, { char: "🦎", name: "lizard" },
  { char: "🐍", name: "snake" }, { char: "🐲", name: "dragon" }, { char: "🐉", name: "dragon" }, { char: "🦕", name: "dino" },
  { char: "🦖", name: "dino" }, { char: "🐳", name: "whale" }, { char: "🐋", name: "whale" }, { char: "🐬", name: "dolphin" },
  { char: "🐟", name: "fish" }, { char: "🐠", name: "fish" }, { char: "🐡", name: "fish" }, { char: "🦈", name: "shark" },
  { char: "🐙", name: "octopus" }, { char: "🐚", name: "shell" }, { char: "🐌", name: "snail" }, { char: "🦋", name: "butterfly" },
  { char: "🐛", name: "bug" }, { char: "🐜", name: "ant" }, { char: "🐝", name: "bee" }, { char: "🐞", name: "ladybug" },
  { char: "🦗", name: "cricket" }, { char: "🕷️", name: "spider" }, { char: "🕸️", name: "spider web" }, { char: "🦂", name: "scorpion" },
  { char: "🦟", name: "mosquito" }, { char: "🦠", name: "germ" }, { char: "💐", name: "bouquet" }, { char: "🌸", name: "cherry blossom" },
  { char: "💮", name: "flower" }, { char: "🏵️", name: "rosette" }, { char: "🌹", name: "rose" }, { char: "🥀", name: "withered flower" },
  { char: "🌺", name: "hibiscus" }, { char: "🌻", name: "sunflower" }, { char: "🌼", name: "blossom" }, { char: "🌷", name: "tulip" },
  { char: "🌱", name: "seedling" }, { char: "🌲", name: "evergreen" }, { char: "🌳", name: "deciduous" }, { char: "🌴", name: "palm" },
  { char: "🌵", name: "cactus" }, { char: "🌾", name: "sheaf" }, { char: "🌿", name: "herb" }, { char: "☘️", name: "clover" },
  { char: "🍀", name: "four leaf clover" }, { char: "🍁", name: "maple" }, { char: "🍂", name: "fallen leaf" }, { char: "🍃", name: "leaf" },
  // Food & Drink
  { char: "🍏", name: "apple" }, { char: "🍎", name: "apple" }, { char: "🍐", name: "pear" }, { char: "🍊", name: "orange" },
  { char: "🍋", name: "lemon" }, { char: "🍌", name: "banana" }, { char: "🍉", name: "watermelon" }, { char: "🍇", name: "grapes" },
  { char: "🍓", name: "strawberry" }, { char: "🍈", name: "melon" }, { char: "🍒", name: "cherries" }, { char: "🍑", name: "peach" },
  { char: "🥭", name: "mango" }, { char: "🍍", name: "pineapple" }, { char: "🥥", name: "coconut" }, { char: "🥝", name: "kiwi" },
  { char: "🍅", name: "tomato" }, { char: "🍆", name: "eggplant" }, { char: "🥑", name: "avocado" }, { char: "🥦", name: "broccoli" },
  { char: "🥬", name: "leafy green" }, { char: "🥒", name: "cucumber" }, { char: "🌶️", name: "chili" }, { char: "🌽", name: "corn" },
  { char: "🥕", name: "carrot" }, { char: "🧄", name: "garlic" }, { char: "🧅", name: "onion" }, { char: "🥔", name: "potato" },
  { char: "🍠", name: "sweet potato" }, { char: "🥐", name: "croissant" }, { char: "🥯", name: "bagel" }, { char: "🍞", name: "bread" },
  { char: "🥖", name: "baguette" }, { char: "🥨", name: "pretzel" }, { char: "🧀", name: "cheese" }, { char: "🥚", name: "egg" },
  { char: "🍳", name: "cooking" }, { char: "🧈", name: "butter" }, { char: "🥞", name: "pancakes" }, { char: "🧇", name: "waffle" },
  { char: "🥓", name: "bacon" }, { char: "🥩", name: "meat" }, { char: "🍗", name: "poultry" }, { char: "🍖", name: "meat" },
  { char: "🦴", name: "bone" }, { char: "🌭", name: "hotdog" }, { char: "🍔", name: "hamburger" }, { char: "🍟", name: "fries" },
  { char: "🍕", name: "pizza" }, { char: "🥪", name: "sandwich" }, { char: "🥙", name: "pita" }, { char: "🧆", name: "falafel" },
  { char: "🌮", name: "taco" }, { char: "🌯", name: "burrito" }, { char: "🥗", name: "salad" }, { char: "🥘", name: "paella" },
  { char: "🍝", name: "spaghetti" }, { char: "🍜", name: "noodles" }, { char: "🍲", name: "stew" }, { char: "🍛", name: "curry" },
  { char: "🍣", name: "sushi" }, { char: "🍱", name: "bento" }, { char: "🥟", name: "dumpling" }, { char: "🦪", name: "oyster" },
  { char: "🍤", name: "shrimp" }, { char: "🍙", name: "rice ball" }, { char: "🍚", name: "rice" }, { char: "🍘", name: "rice cracker" },
  { char: "🍥", name: "fish cake" }, { char: "🥠", name: "fortune cookie" }, { char: "🥮", name: "moon cake" }, { char: "🍢", name: "oden" },
  { char: "🍡", name: "dango" }, { char: "🍧", name: "shaved ice" }, { char: "🍨", name: "ice cream" }, { char: "🍦", name: "soft serve" },
  { char: "🥧", name: "pie" }, { char: "🧁", name: "cupcake" }, { char: "🍰", name: "cake" }, { char: "🎂", name: "birthday" },
  { char: "🍮", name: "custard" }, { char: "🍭", name: "lollipop" }, { char: "🍬", name: "candy" }, { char: "🍫", name: "chocolate" },
  { char: "🍿", name: "popcorn" }, { char: "🍩", name: "doughnut" }, { char: "🍪", name: "cookie" }, { char: "🌰", name: "chestnut" },
  { char: "🥜", name: "peanuts" }, { char: "🍯", name: "honey" }, { char: "🥛", name: "milk" }, { char: "☕", name: "coffee" },
  { char: "🍵", name: "tea" }, { char: "🧃", name: "juice" }, { char: "🥤", name: "soda" }, { char: "🍶", name: "sake" },
  { char: "🍺", name: "beer" }, { char: "🍻", name: "beers" }, { char: "🥂", name: "cheers" }, { char: "🍷", name: "wine" },
  { char: "🥃", name: "whiskey" }, { char: "🍸", name: "cocktail" }, { char: "🍹", name: "drink" }, { char: "🧉", name: "mate" },
  { char: "🍾", name: "champagne" }, { char: "🧊", name: "ice" }, { char: "🥤", name: "cup" },
  // Activities & Objects
  { char: "⚽", name: "soccer" }, { char: "🏀", name: "basketball" }, { char: "🏈", name: "football" }, { char: "⚾", name: "baseball" },
  { char: "🎾", name: "tennis" }, { char: "🏐", name: "volleyball" }, { char: "🏉", name: "rugby" }, { char: "🏓", name: "ping pong" },
  { char: "🏸", name: "badminton" }, { char: "🥅", name: "goal" }, { char: "🏒", name: "hockey" }, { char: "🏑", name: "hockey" },
  { char: "🏏", name: "cricket" }, { char: "⛳", name: "golf" }, { char: "🏹", name: "archery" }, { char: "🎣", name: "fishing" },
  { char: "🤿", name: "diving" }, { char: "🥊", name: "boxing" }, { char: "🥋", name: "martial arts" }, { char: "⛸️", name: "skate" },
  { char: "🎿", name: "ski" }, { char: "🛷", name: "sled" }, { char: "🥌", name: "curling" }, { char: "🎯", name: "dart" },
  { char: "🪀", name: "yo-yo" }, { char: "🪁", name: "kite" }, { char: "🎱", name: "billiards" }, { char: "🔮", name: "crystal ball" },
  { char: "🧿", name: "nazar" }, { char: "🎮", name: "video game" }, { char: "🕹️", name: "joystick" }, { char: "🎰", name: "slot machine" },
  { char: "🎲", name: "die" }, { char: "🧩", name: "puzzle" }, { char: "🧸", name: "teddy bear" }, { char: "♠️", name: "spades" },
  { char: "♥️", name: "hearts" }, { char: "♦️", name: "diamonds" }, { char: "♣️", name: "clubs" }, { char: "♟️", name: "chess" },
  { char: "🃏", name: "joker" }, { char: "🀄", name: "mahjong" }, { char: "🎴", name: "flower cards" }, { char: "🎭", name: "mask" },
  { char: "🖼️", name: "picture" }, { char: "🎨", name: "art" }, { char: "🧵", name: "thread" }, { char: "🧶", name: "yarn" },
  { char: "🛍️", name: "shopping" }, { char: "💄", name: "lipstick" }, { char: "💎", name: "gem" }, { char: "💍", name: "ring" },
  { char: "🕶️", name: "sunglasses" }, { char: "👓", name: "glasses" }, { char: "👜", name: "handbag" }, { char: "💼", name: "briefcase" },
  { char: "🎒", name: "backpack" }, { char: "👞", name: "shoe" }, { char: "👟", name: "sneaker" }, { char: "👠", name: "heel" },
  { char: "👡", name: "sandal" }, { char: "👢", name: "boot" }, { char: "👑", name: "crown" }, { char: "👒", name: "hat" },
  { char: "🎩", name: "top hat" }, { char: "🎓", name: "graduation" }, { char: "🧢", name: "cap" }, { char: "⛑️", name: "helmet" },
  { char: "💄", name: "makeup" }, { char: "🌂", name: "umbrella" }, { char: "☂️", name: "umbrella" },
  // Travel & Places
  { char: "🌍", name: "earth" }, { char: "🌎", name: "earth" }, { char: "🌏", name: "earth" }, { char: "🌐", name: "globe" },
  { char: "🗺️", name: "map" }, { char: "🗾", name: "japan" }, { char: "🧭", name: "compass" }, { char: "🏔️", name: "mountain" },
  { char: "⛰️", name: "mountain" }, { char: "🌋", name: "volcano" }, { char: "🗻", name: "fuji" }, { char: "🏕️", name: "camping" },
  { char: "🏖️", name: "beach" }, { char: "🏜️", name: "desert" }, { char: "🏝️", name: "island" }, { char: "🏙️", name: "city" },
  { char: "🏚️", name: "house" }, { char: "🏠", name: "house" }, { char: "🏡", name: "house" }, { char: "🏢", name: "office" },
  { char: "🏣", name: "post office" }, { char: "🏤", name: "post office" }, { char: "🏥", name: "hospital" }, { char: "🏦", name: "bank" },
  { char: "🏨", name: "hotel" }, { char: "🏩", name: "love hotel" }, { char: "🏪", name: "convenience store" }, { char: "🏫", name: "school" },
  { char: "🏬", name: "department store" }, { char: "🏭", name: "factory" }, { char: "🏯", name: "castle" }, { char: "🏰", name: "castle" },
  { char: "💒", name: "wedding" }, { char: "🗼", name: "tokyo tower" }, { char: "🗽", name: "statue of liberty" }, { char: "⛪", name: "church" },
  { char: "🕌", name: "mosque" }, { char: "🛕", name: "temple" }, { char: "🕍", name: "synagogue" }, { char: "⛩️", name: "shrine" },
  { char: "🕋", name: "kaaba" }, { char: "⛲", name: "fountain" }, { char: "⛺", name: "tent" }, { char: "🌁", name: "foggy" },
  { char: "🌃", name: "night" }, { char: "🏙️", name: "cityscape" }, { char: "🌅", name: "sunrise" }, { char: "🌇", name: "sunset" },
  { char: "🌉", name: "bridge" }, { char: "♨️", name: "hot springs" }, { char: "🎠", name: "carousel" }, { char: "🎡", name: "ferris wheel" },
  { char: "🎢", name: "roller coaster" }, { char: "🚂", name: "locomotive" }, { char: "🚃", name: "railway" }, { char: "🚄", name: "bullet train" },
  { char: "🚅", name: "bullet train" }, { char: "🚆", name: "train" }, { char: "🚇", name: "metro" }, { char: "🚈", name: "light rail" },
  { char: "🚉", name: "station" }, { char: "🚊", name: "tram" }, { char: "🚝", name: "monorail" }, { char: "🚞", name: "mountain rail" },
  { char: "🚋", name: "tram" }, { char: "🚌", name: "bus" }, { char: "🚍", name: "bus" }, { char: "🚎", name: "trolleybus" },
  { char: "🚐", name: "minibus" }, { char: "🚑", name: "ambulance" }, { char: "🚒", name: "fire engine" }, { char: "🚓", name: "police car" },
  { char: "🚔", name: "police car" }, { char: "🚕", name: "taxi" }, { char: "🚖", name: "taxi" }, { char: "🚗", name: "car" },
  { char: "🚘", name: "car" }, { char: "🚙", name: "suv" }, { char: "🚚", name: "truck" }, { char: "🚛", name: "truck" },
  { char: "🚜", name: "tractor" }, { char: "🏎️", name: "race car" }, { char: "🏍️", name: "motorcycle" }, { char: "🛵", name: "scooter" },
  { char: "🚲", name: "bicycle" }, { char: "🛴", name: "scooter" }, { char: "🚏", name: "bus stop" }, { char: "🛣️", name: "motorway" },
  { char: "🛤️", name: "railway" }, { char: "⛽", name: "fuel" }, { char: "🚨", name: "siren" }, { char: "🚥", name: "traffic light" },
  { char: "🚦", name: "traffic light" }, { char: "🚧", name: "construction" }, { char: "🛑", name: "stop" }, { char: "⚓", name: "anchor" },
  { char: "⛵", name: "sailboat" }, { char: "🛶", name: "canoe" }, { char: "🚤", name: "speedboat" }, { char: "🛳️", name: "passenger ship" },
  { char: "⛴️", name: "ferry" }, { char: "🛥️", name: "motorboat" }, { char: "🚢", name: "ship" }, { char: "✈️", name: "plane" },
  { char: "🛩️", name: "plane" }, { char: "🛫", name: "departure" }, { char: "🛬", name: "arrival" }, { char: "🪂", name: "parachute" },
  { char: "💺", name: "seat" }, { char: "🚁", name: "helicopter" }, { char: "🚟", name: "suspension railway" }, { char: "🚠", name: "cable car" },
  { char: "🚡", name: "aerial tramway" }, { char: "🚀", name: "rocket" }, { char: "🛸", name: "ufo" }, { char: "🛰️", name: "satellite" },
  { char: "🛎️", name: "bellhop" }, { char: "⌛", name: "hourglass" }, { char: "⏳", name: "hourglass" }, { char: "⌚", name: "watch" },
  { char: "⏰", name: "alarm" }, { char: "⏱️", name: "stopwatch" }, { char: "⏲️", name: "timer" }, { char: "🕰️", name: "clock" },
  { char: "🌡️", name: "thermometer" }, { char: "☀️", name: "sun" }, { char: "🌝", name: "moon" }, { char: "🌛", name: "moon" },
  { char: "🌜", name: "moon" }, { char: "🌚", name: "moon" }, { char: "🌙", name: "moon" }, { char: "🌕", name: "moon" },
  { char: "🌖", name: "moon" }, { char: "🌗", name: "moon" }, { char: "🌘", name: "moon" }, { char: "🌑", name: "moon" },
  { char: "🌒", name: "moon" }, { char: "🌓", name: "moon" }, { char: "🌔", name: "moon" }, { char: "⭐", name: "star" },
  { char: "🌟", name: "star" }, { char: "🌠", name: "shooting star" }, { char: "☁️", name: "cloud" }, { char: "⛅", name: "sun cloud" },
  { char: "⛈️", name: "thunder cloud" }, { char: "🌤️", name: "sun cloud" }, { char: "🌥️", name: "sun cloud" }, { char: "🌦️", name: "sun rain" },
  { char: "🌧️", name: "rain cloud" }, { char: "🌨️", name: "snow cloud" }, { char: "🌩️", name: "lightning cloud" }, { char: "🌪️", name: "tornado" },
  { char: "🌫️", name: "fog" }, { char: "🌬️", name: "wind" }, { char: "🌈", name: "rainbow" }, { char: "⛱️", name: "umbrella" },
  { char: "⚡", name: "lightning" }, { char: "❄️", name: "snowflake" }, { char: "☃️", name: "snowman" }, { char: "⛄", name: "snowman" },
  { char: "🔥", name: "fire" }, { char: "💧", name: "drop" }, { char: "🌊", name: "wave" },
  // Objects & Symbols
  { char: "🎁", name: "gift" }, { char: "🎈", name: "balloon" }, { char: "🎉", name: "party popper" }, { char: "🎊", name: "confetti" },
  { char: "🎀", name: "ribbon" }, { char: "🪄", name: "magic wand" }, { char: "🧿", name: "nazar" }, { char: "🧧", name: "red envelope" },
  { char: "🏮", name: "lantern" }, { char: "🎐", name: "wind chime" }, { char: "🕯️", name: "candle" }, { char: "💡", name: "bulb" },
  { char: "🔦", name: "flashlight" }, { char: "🏮", name: "lantern" }, { char: "🧱", name: "brick" }, { char: "🪙", name: "coin" },
  { char: "💸", name: "money" }, { char: "💵", name: "money" }, { char: "💴", name: "money" }, { char: "💶", name: "money" },
  { char: "💷", name: "money" }, { char: "💰", name: "money" }, { char: "💳", name: "card" }, { char: "💎", name: "gem" },
  { char: "⚖️", name: "balance" }, { char: "🔧", name: "wrench" }, { char: "🔨", name: "hammer" }, { char: "⚒️", name: "hammer" },
  { char: "🛠️", name: "tools" }, { char: "⛏️", name: "pick" }, { char: "🔩", name: "bolt" }, { char: "⚙️", name: "gear" },
  { char: "🪓", name: "axe" }, { char: "🔫", name: "gun" }, { char: "🛡️", name: "shield" }, { char: "⚔️", name: "swords" },
  { char: "🗡️", name: "dagger" }, { char: "⛓️", name: "chains" }, { char: "🔗", name: "link" }, { char: "💉", name: "syringe" },
  { char: "💊", name: "pill" }, { char: "🩹", name: "bandage" }, { char: "🩺", name: "stethoscope" }, { char: "🔭", name: "telescope" },
  { char: "🔬", name: "microscope" }, { char: "🌡️", name: "thermometer" }, { char: "🧪", name: "flask" }, { char: "🧫", name: "petri dish" },
  { char: "🧬", name: "dna" }, { char: "📡", name: "satellite" }, { char: "🛰️", name: "satellite" }, { char: "🛰️", name: "satellite" },
];

// Create a client component that uses useSearchParams
function BackgroundContent() {
  const router = useRouter();
  // Import useSearchParams inside this component
  const { useSearchParams } = require("next/navigation");
  const searchParams = useSearchParams();
  const [images, setImages] = useState([]);
  const [cardColor, setCardColor] = useState("#f5a9b8"); // Default pink for the card background
  const [showDate, setShowDate] = useState(true); // Toggle for date display
  const [customColor, setCustomColor] = useState("#f5a9b8");
  const [stripWidth, setStripWidth] = useState(320); // Default width
  const [stripGap, setStripGap] = useState(12); // Gap between photos
  const [stripPadding, setStripPadding] = useState(24); // Padding inside the strip
  const [borderRadius, setBorderRadius] = useState(12); // Border radius for photos
  const [borderWidth, setBorderWidth] = useState(2); // Border width for photos
  const [borderColor, setBorderColor] = useState("#ffffff"); // Border color for photos
  const [dateFormat, setDateFormat] = useState("short"); // Date format options
  const [stripMinimized, setStripMinimized] = useState(false); // Toggle for minimized view
  const [activeTab, setActiveTab] = useState("frames"); // Active customization tab
  const [isSaving, setIsSaving] = useState(false); // State for save operation
  const [saveSuccess, setSaveSuccess] = useState(false); // State for save success feedback
  const [dateFontColor, setDateFontColor] = useState("#000000");

  // Custom frames state
  const [customFrameSrc, setCustomFrameSrc] = useState(null);
  const [printFormat, setPrintFormat] = useState("strip"); // "strip" (2x6) or "postcard" (4x6)

  // Adjustments state
  const [frameTransform, setFrameTransform] = useState({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
  const [imageTransforms, setImageTransforms] = useState([]);
  const [imagePans, setImagePans] = useState([]);
  const [selectedEditElement, setSelectedEditElement] = useState('frame');

  // Drag and resize state
  const [dragState, setDragState] = useState({
    isDragging: false,
    mode: null,
    startX: 0,
    startY: 0,
    initialTransform: null
  });

  const [customMode, setCustomMode] = useState("upload"); // "upload" or "custom"
  const [stickers, setStickers] = useState([]); // [{ id, emoji, x, y, scaleX, scaleY, rotate }]
  const [brushColor, setBrushColor] = useState("#e53e3e");
  const [brushSize, setBrushSize] = useState(8);
  const [drawingPaths, setDrawingPaths] = useState([]);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const stickerCounter = useRef(0);
  const stickerDragRef = useRef(null); // { id, mode, startX, startY, initX, initY, initScaleX, initScaleY }
  const [isDrawing, setIsDrawing] = useState(false);
  const [emojiSearch, setEmojiSearch] = useState("");

  const fontColorPresets = [
    "#000000", // Black
    "#ffffff", // White
    "#ff0000", // Red
    "#00ff00", // Green
    "#0000ff", // Blue
    "#ffff00", // Yellow
    "#ff00ff", // Magenta
    "#00ffff", // Cyan
    "#808080", // Gray
  ];

  const photoStripRef = useRef(null); // Reference to the photo strip for html2canvas

  useEffect(() => {
    // Check if we're coming from the photo capture page
    const isComplete = searchParams.get("complete") === "true";

    if (isComplete) {
      try {
        const storedImages = localStorage.getItem('photoBoothImages');
        if (storedImages) {
          const parsedImages = JSON.parse(storedImages);
          setImages(parsedImages);
          setImageTransforms(new Array(parsedImages.length).fill({ x: 0, y: 0, scaleX: 1, scaleY: 1 }));
          setImagePans(new Array(parsedImages.length).fill({ x: 50, y: 50 }));
        } else {
          // Fallback to placeholder images if no stored images found
          const fallbacks = [
            { src: "/api/placeholder/400/400", filter: "none" },
            { src: "/api/placeholder/400/400", filter: "sepia" },
            { src: "/api/placeholder/400/400", filter: "grayscale" },
            { src: "/api/placeholder/400/400", filter: "vintage" }
          ];
          setImages(fallbacks);
          setImageTransforms(new Array(fallbacks.length).fill({ x: 0, y: 0, scaleX: 1, scaleY: 1 }));
          setImagePans(new Array(fallbacks.length).fill({ x: 50, y: 50 }));
        }
      } catch (error) {
        console.error("Error retrieving images:", error);
        // Fallback to placeholder images
        const fallbacks = [
          { src: "/api/placeholder/400/400", filter: "none" },
          { src: "/api/placeholder/400/400", filter: "sepia" },
          { src: "/api/placeholder/400/400", filter: "grayscale" },
          { src: "/api/placeholder/400/400", filter: "vintage" }
        ];
        setImages(fallbacks);
        setImageTransforms(new Array(fallbacks.length).fill({ x: 0, y: 0, scaleX: 1, scaleY: 1 }));
      }
    } else {
      // Redirect if no images are available
      router.push("/");
    }
  }, [searchParams, router]);

  // Set default styling for grid layouts
  useEffect(() => {
    // Check if user selected a print format in booth selection
    const savedFormat = localStorage.getItem('printFormat');
    if (savedFormat) {
      setPrintFormat(savedFormat);
      if (savedFormat === "strip") setStripWidth(320);
      else setStripWidth(500);
    } else {
      // Fallback/Default: Determine format: 1, 2, 4, 6, 8 -> postcard (4x6). Others -> strip (2x4).
      const isPostcard = [1, 2, 4, 6, 8].includes(images.length);
      setPrintFormat(isPostcard ? "postcard" : "strip");
    }

    if (images.length >= 5) {
      setCardColor("#111111");
      setDateFontColor("#ffffff");
      setStripPadding(36);
      setBorderRadius(0);
      setStripGap(12);
      setBorderWidth(0);
    }
  }, [images.length]);

  const handleFrameUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomFrameSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert("Please upload a PNG file with transparency.");
    }
  };

  const handleTransformChange = (key, value) => {
    if (selectedEditElement === 'frame') {
      setFrameTransform(prev => ({ ...prev, [key]: value }));
    } else {
      const index = parseInt(selectedEditElement.split('-')[1]);
      setImageTransforms(prev => {
        const newTransforms = [...prev];
        newTransforms[index] = { ...newTransforms[index], [key]: value };
        return newTransforms;
      });
    }
  };

  const currentStickerTransform = selectedEditElement?.startsWith?.('sticker-')
    ? (stickers.find(s => `sticker-${s.id}` === selectedEditElement) || { x: 100, y: 100, scaleX: 1, scaleY: 1 })
    : null;

  const currentTransform = selectedEditElement === 'frame'
    ? frameTransform
    : selectedEditElement?.startsWith?.('sticker-')
      ? (currentStickerTransform || { x: 0, y: 0, scaleX: 1, scaleY: 1 })
      : (imageTransforms[parseInt(selectedEditElement?.split('-')[1])] || { x: 0, y: 0, scaleX: 1, scaleY: 1 });

  const handlePointerDown = (e, mode) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the base width and height of the bounding box
    const rect = e.target.parentElement.getBoundingClientRect();

    setDragState({
      isDragging: true,
      mode: mode,
      startX: e.clientX,
      startY: e.clientY,
      initialTransform: { ...currentTransform },
      baseW: rect.width / currentTransform.scaleX,
      baseH: rect.height / currentTransform.scaleY
    });
  };

  const handlePanPointerDown = (e, index) => {
    if (customMode !== "custom") return;
    e.preventDefault();
    e.stopPropagation();
    
    setDragState({
      isDragging: true,
      mode: 'pan',
      type: 'image-pan',
      index: index,
      startX: e.clientX,
      startY: e.clientY,
      initialTransform: imagePans[index] || { x: 50, y: 50 }
    });
  };

  const moveImage = (index, direction) => {
    if ((direction === -1 && index === 0) || (direction === 1 && index === images.length - 1)) return;
    
    setImages(prev => {
      const newImages = [...prev];
      const temp = newImages[index];
      newImages[index] = newImages[index + direction];
      newImages[index + direction] = temp;
      return newImages;
    });

    setImagePans(prev => {
      const newPans = [...prev];
      const temp = newPans[index];
      newPans[index] = newPans[index + direction];
      newPans[index + direction] = temp;
      return newPans;
    });
    
    setImageTransforms(prev => {
      const newTransforms = [...prev];
      const temp = newTransforms[index];
      newTransforms[index] = newTransforms[index + direction];
      newTransforms[index + direction] = temp;
      return newTransforms;
    });
  };

  // ---- Sticker dedicated drag/resize system ----
  const handleStickerPointerDown = (e, stickerId, mode) => {
    e.preventDefault();
    e.stopPropagation();
    const sticker = stickers.find(s => s.id === stickerId);
    if (!sticker) return;
    setSelectedEditElement(`sticker-${stickerId}`);

    // For rotation, we need the sticker's center in page coordinates
    // The sticker element position is at (sticker.x, sticker.y) in the strip container
    // We use atan2 from center to get initial angle
    let initAngle = 0;
    if (mode === 'rotate') {
      const stripEl = photoStripRef.current;
      if (stripEl) {
        const rect = stripEl.getBoundingClientRect();
        const centerX = rect.left + sticker.x;
        const centerY = rect.top + sticker.y;
        initAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      }
    }

    stickerDragRef.current = {
      id: stickerId,
      mode,
      startX: e.clientX,
      startY: e.clientY,
      initX: sticker.x,
      initY: sticker.y,
      initScaleX: sticker.scaleX,
      initScaleY: sticker.scaleY,
      initRotate: sticker.rotate ?? 0,
      initAngle,
    };
    window.addEventListener('pointermove', onStickerPointerMove);
    window.addEventListener('pointerup', onStickerPointerUp);
  };

  const onStickerPointerMove = (e) => {
    const drag = stickerDragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (drag.mode === 'move') {
      setStickers(prev => prev.map(s => s.id === drag.id
        ? { ...s, x: drag.initX + dx, y: drag.initY + dy }
        : s
      ));
    } else if (drag.mode === 'resize') {
      const newScale = Math.max(0.3, drag.initScaleX + (dx + dy) / 100);
      setStickers(prev => prev.map(s => s.id === drag.id
        ? { ...s, scaleX: newScale, scaleY: newScale }
        : s
      ));
    } else if (drag.mode === 'rotate') {
      // Get current sticker position from ref data
      const stripEl = photoStripRef.current;
      if (!stripEl) return;
      const rect = stripEl.getBoundingClientRect();
      // Find the sticker's current position
      const stickerState = stickers.find(s => s.id === drag.id);
      const sx = stickerState ? stickerState.x : drag.initX;
      const sy = stickerState ? stickerState.y : drag.initY;
      const centerX = rect.left + sx;
      const centerY = rect.top + sy;
      const currAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      const newRotate = drag.initRotate + (currAngle - drag.initAngle);
      setStickers(prev => prev.map(s => s.id === drag.id
        ? { ...s, rotate: newRotate }
        : s
      ));
    }
  };

  const onStickerPointerUp = () => {
    stickerDragRef.current = null;
    window.removeEventListener('pointermove', onStickerPointerMove);
    window.removeEventListener('pointerup', onStickerPointerUp);
  };
  // ---- End sticker drag system ----

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    drawingPaths.forEach(path => {
      if (path.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.width;
      ctx.moveTo(path.points[0].x, path.points[0].y);
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y);
      }
      ctx.stroke();
    });
  };

  // Sync canvas size to container, keep drawings
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      // Save image data, resize, restore
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.putImageData(imageData, 0, 0);
      redrawCanvas();
    });
    observer.observe(canvas);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    redrawCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawingPaths]);

  const handleCanvasPointerDown = (e) => {
    if (activeTab !== 'draw') return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    isDrawingRef.current = true;
    setIsDrawing(true);

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = brushColor;
    ctx.fill();

    setDrawingPaths(prev => [...prev, {
      color: brushColor,
      width: brushSize,
      points: [{ x, y }]
    }]);
  };

  const handleCanvasPointerMove = (e) => {
    if (!isDrawingRef.current || activeTab !== 'draw') return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Draw incrementally on canvas for smooth feel
    const ctx = canvas.getContext('2d');
    setDrawingPaths(prev => {
      const newPaths = [...prev];
      const path = newPaths[newPaths.length - 1];
      const lastPt = path.points[path.points.length - 1];
      ctx.beginPath();
      ctx.moveTo(lastPt.x, lastPt.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      path.points.push({ x, y });
      return newPaths;
    });
  };

  const handleCanvasPointerUp = () => {
    isDrawingRef.current = false;
    setIsDrawing(false);
  };

  useEffect(() => {
    if (!dragState.isDragging) return;

    const handlePointerMove = (e) => {
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;

      if (dragState.mode === 'pan' && dragState.type === 'image-pan') {
        setImagePans(prev => {
          const newPans = [...prev];
          // Use sensitivity factor for percentage translation (e.g. 1px = 0.5%)
          // dx > 0 means drag right. We want image to visually shift right.
          // Since image is flipped horizontally (scaleX(-1)), we shift the unscaled focal point in the opposite direction -> increase X%
          const sensitivity = 0.5;
          const newX = dragState.initialTransform.x + (dx * sensitivity);
          const newY = dragState.initialTransform.y - (dy * sensitivity);
          
          newPans[dragState.index] = {
            x: Math.max(0, Math.min(100, newX)),
            y: Math.max(0, Math.min(100, newY))
          };
          return newPans;
        });
        return;
      }

      let newTransform = { ...dragState.initialTransform };

      if (dragState.mode === 'move') {
        newTransform.x += dx;
        newTransform.y += dy;
      } else {
        const W = dragState.baseW || 200;
        const H = dragState.baseH || 200;

        let nextScaleX = newTransform.scaleX;
        let nextScaleY = newTransform.scaleY;

        if (dragState.mode === 'resize-br') {
          nextScaleX += dx / W;
          nextScaleY += dy / H;
        } else if (dragState.mode === 'resize-bl') {
          nextScaleX -= dx / W;
          nextScaleY += dy / H;
        } else if (dragState.mode === 'resize-tr') {
          nextScaleX += dx / W;
          nextScaleY -= dy / H;
        } else if (dragState.mode === 'resize-tl') {
          nextScaleX -= dx / W;
          nextScaleY -= dy / H;
        }

        // Clamp scales
        const clampedScaleX = Math.max(0.1, nextScaleX);
        const clampedScaleY = Math.max(0.1, nextScaleY);

        // Re-calculate the actual dx/dy that contributed to the scale change to avoid drift
        let actualDx = dx;
        let actualDy = dy;

        if (dragState.mode === 'resize-br') {
          actualDx = (clampedScaleX - newTransform.scaleX) * W;
          actualDy = (clampedScaleY - newTransform.scaleY) * H;
        } else if (dragState.mode === 'resize-bl') {
          actualDx = -(clampedScaleX - newTransform.scaleX) * W;
          actualDy = (clampedScaleY - newTransform.scaleY) * H;
        } else if (dragState.mode === 'resize-tr') {
          actualDx = (clampedScaleX - newTransform.scaleX) * W;
          actualDy = -(clampedScaleY - newTransform.scaleY) * H;
        } else if (dragState.mode === 'resize-tl') {
          actualDx = -(clampedScaleX - newTransform.scaleX) * W;
          actualDy = -(clampedScaleY - newTransform.scaleY) * H;
        }

        // Always move center by half the actual delta width/height to keep opposite corner fixed
        newTransform.x += actualDx / 2;
        newTransform.y += actualDy / 2;
        newTransform.scaleX = clampedScaleX;
        newTransform.scaleY = clampedScaleY;
      }

      if (selectedEditElement === 'frame') {
        setFrameTransform(newTransform);
      } else if (selectedEditElement?.startsWith?.('sticker-')) {
        const stickerId = parseInt(selectedEditElement.replace('sticker-', ''));
        setStickers(prev => prev.map(s => s.id === stickerId ? { ...s, ...newTransform } : s));
      } else {
        const index = parseInt(selectedEditElement?.split('-')[1]);
        setImageTransforms(prev => {
          const arr = [...prev];
          arr[index] = newTransform;
          return arr;
        });
      }
    };





    const handlePointerUp = () => {
      setDragState(prev => ({ ...prev, isDragging: false }));
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [dragState, selectedEditElement]);

  // Filter CSS styles - copied from PhotoCapture for consistent rendering
  const filterStyles = {
    none: {},
    grayscale: { filter: "grayscale(1)" },
    sepia: { filter: "sepia(0.8)" },
    invert: { filter: "invert(0.8)" },
    blur: { filter: "blur(1px) brightness(1.1)" },
    brightness: { filter: "brightness(1.3) contrast(1.1)" },
    vintage: { filter: "sepia(0.3) contrast(1.1) brightness(0.9) saturate(1.5)" },
    film: { filter: "blur(1px) saturate(0.7) contrast(1.5) brightness(1.2)" }
  };

  const handleCustomColorChange = (e) => {
    setCustomColor(e.target.value);
    // Apply color immediately for better UX
    setCardColor(e.target.value);
  };

  const handleSave = async () => {
    if (!photoStripRef.current) return;

    const prevSelected = selectedEditElement;
    try {
      setIsSaving(true);
      setSelectedEditElement(null); // Hide drag overlays

      // Temporarily remove minimized state for capture
      const wasMinimized = stripMinimized;
      if (wasMinimized) setStripMinimized(false);

      // Apply inline styles for filters
      const imagesWithFilters = photoStripRef.current.querySelectorAll("img[data-filter]");
      imagesWithFilters.forEach((img) => {
        const filterType = img.getAttribute("data-filter");
        if (filterType) {
          if (filterType.includes('(')) {
            img.style.filter = filterType;
          } else if (filterStyles[filterType]) {
            img.style.filter = filterStyles[filterType].filter;
          }
        }
      });

      // Small delay to ensure the DOM has updated
      await new Promise(resolve => setTimeout(resolve, 150));

      // Use html2canvas to capture the photo strip
      const canvas = await html2canvas(photoStripRef.current, {
        useCORS: true,
        scale: 2, // Higher quality
        backgroundColor: null, // Transparent background
      });

      // Convert to image and trigger download
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `photo-strip-${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset minimized state if needed
      if (wasMinimized) setStripMinimized(true);

      // Show success feedback
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving photo strip:", error);
      alert("There was a problem saving your photo strip. Please try again.");
    } finally {
      setIsSaving(false);
      setSelectedEditElement(prevSelected); // Restore selection
    }
  };

  // Function to handle sharing the photo strip
  const handleShare = async () => {
    if (!photoStripRef.current) return;

    const prevSelected = selectedEditElement;
    try {
      setIsSaving(true);
      setSelectedEditElement(null); // Hide drag overlays

      // Temporarily remove minimized state for capture
      const wasMinimized = stripMinimized;
      if (wasMinimized) setStripMinimized(false);

      // Small delay to ensure the DOM has updated
      await new Promise(resolve => setTimeout(resolve, 150));

      // Use html2canvas to capture the photo strip
      const canvas = await html2canvas(photoStripRef.current, {
        useCORS: true,
        scale: 2, // Higher quality
        backgroundColor: null, // Transparent background
      });

      // Convert to blob for sharing
      canvas.toBlob(async (blob) => {
        try {
          if (!blob) throw new Error("Failed to create image blob");

          // Check if Web Share API is available
          if (navigator.share) {
            await navigator.share({
              title: 'My Photo Strip',
              files: [new File([blob], 'photo-strip.png', { type: 'image/png' })]
            });
          } else {
            // Fallback if Web Share API is not available
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `photo-strip-${new Date().toISOString().split('T')[0]}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } catch (error) {
          console.error("Error sharing photo strip:", error);
          alert("There was a problem sharing your photo strip. You can try saving it instead.");
        } finally {
          // Reset minimized state if needed
          if (wasMinimized) setStripMinimized(true);
          setSelectedEditElement(prevSelected); // Restore selection
          setIsSaving(false);
        }
      }, 'image/png');

    } catch (error) {
      console.error("Error sharing photo strip:", error);
      alert("There was a problem preparing your photo strip for sharing. Please try again.");
      setSelectedEditElement(prevSelected); // Restore selection
      setIsSaving(false);
    }
  };

  // Date format options
  const dateFormats = {
    short: new Date().toLocaleDateString(),
    long: new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    time: new Date().toLocaleString()
  };

  // Generate range slider with label
  const RangeSlider = ({ label, value, onChange, min, max, step = 1 }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-xs text-gray-500">{value}px</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );

  // Color picker component
  const ColorPicker = ({ color, onChange, label }) => (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2 text-gray-700">{label}</h3>
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-lg border border-gray-200"
          style={{ backgroundColor: color }}
          aria-label={`Color preview: ${color}`}
        ></div>
        <div className="flex-1">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-8 cursor-pointer rounded"
            aria-label={`${label} color picker`}
          />
        </div>
      </div>
    </div>
  );

  // Presets for background color
  const colorPresets = [
    "#f5a9b8", "#a9def5", "#d4f5a9", "#f5d6a9", "#e5a9f5",
    "#f5f5f5", "#000000", "#ffffff", "#ff4d4d", "#4d79ff"
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-4 md:p-6 bg-gray-50">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header - Minimalist version */}
        <div className="w-full flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-500 bg-white hover:bg-gray-50 transition p-2 rounded-full shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-light text-center text-gray-800">Your Photo Strip</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Content area with side panel and photo strip */}
        <div className="w-full flex flex-col md:flex-row gap-6 items-start">
          {/* Left sidebar for customization - Vertical Tabs Layout */}
          <div className="w-full md:w-100 bg-white rounded-lg shadow-sm flex flex-col border border-gray-200 overflow-hidden max-h-[85vh]">
            <div className="flex flex-col border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center p-4">
                <h2 className="text-lg font-bold text-gray-800">Customize</h2>
                <button
                  onClick={() => setStripMinimized(!stripMinimized)}
                  className="text-gray-400 hover:text-gray-600 transition"
                  title={stripMinimized ? "Maximize Strip" : "Minimize Strip"}
                >
                  {stripMinimized ? <Maximize size={16} /> : <Minimize size={16} />}
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="flex px-4 pb-3">
                <div className="flex w-full bg-gray-200 rounded-xl p-1 gap-1">
                  <button
                    onClick={() => {
                      setCustomMode("upload");
                      setActiveTab("frames");
                    }}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${customMode === "upload"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Upload Frame
                  </button>
                  <button
                    onClick={() => {
                      setCustomMode("custom");
                      setActiveTab("colors");
                    }}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${customMode === "custom"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    DIY Frame
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-1 min-h-[400px] overflow-hidden">
              {/* Vertical Tabs - conditional on mode */}
              <div className="w-20 bg-gray-50 border-r border-gray-100 flex flex-col pt-2 overflow-y-auto hide-scrollbar">
                {customMode === "upload" ? (
                  /* Upload Frame mode: only show Frames tab */
                  <button
                    onClick={() => setActiveTab("frames")}
                    className={`flex flex-col items-center justify-center py-4 px-2 text-[11px] font-medium border-l-[3px] transition-colors ${activeTab === "frames" ? "border-blue-500 text-blue-600 bg-white" : "border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`}
                  >
                    <FileImage size={22} className="mb-1.5" /> Frames
                  </button>
                ) : (
                  /* Custom Design mode: show design tools */
                  <>
                    <button
                      onClick={() => setActiveTab("colors")}
                      className={`flex flex-col items-center justify-center py-4 px-2 text-[11px] font-medium border-l-[3px] transition-colors ${activeTab === "colors" ? "border-purple-500 text-purple-600 bg-white" : "border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`}
                    >
                      <Palette size={22} className="mb-1.5" /> Colors
                    </button>
                    <button
                      onClick={() => setActiveTab("layout")}
                      className={`flex flex-col items-center justify-center py-4 px-2 text-[11px] font-medium border-l-[3px] transition-colors ${activeTab === "layout" ? "border-purple-500 text-purple-600 bg-white" : "border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`}
                    >
                      <Sliders size={22} className="mb-1.5" /> Layout
                    </button>
                    <button
                      onClick={() => setActiveTab("extras")}
                      className={`flex flex-col items-center justify-center py-4 px-2 text-[11px] font-medium border-l-[3px] transition-colors ${activeTab === "extras" ? "border-purple-500 text-purple-600 bg-white" : "border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`}
                    >
                      <Image size={22} className="mb-1.5" alt="" /> Extras
                    </button>
                    <button
                      onClick={() => setActiveTab("stickers")}
                      className={`flex flex-col items-center justify-center py-4 px-2 text-[11px] font-medium border-l-[3px] transition-colors ${activeTab === "stickers" ? "border-purple-500 text-purple-600 bg-white" : "border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`}
                    >
                      <Sticker size={22} className="mb-1.5" /> Stickers
                    </button>
                    <button
                      onClick={() => setActiveTab("draw")}
                      className={`flex flex-col items-center justify-center py-4 px-2 text-[11px] font-medium border-l-[3px] transition-colors ${activeTab === "draw" ? "border-purple-500 text-purple-600 bg-white" : "border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`}
                    >
                      <Pencil size={22} className="mb-1.5" /> Draw
                    </button>
                  </>
                )}
              </div>

              {/* Tab content container */}
              <div className="flex-1 overflow-y-auto p-4 bg-white hide-scrollbar">
                {/* Frames Tab */}
                {activeTab === "frames" && (
                  <div className="space-y-4">

                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-700">Custom Frame Overlay</h3>
                      <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center bg-gray-50 text-center">
                        {customFrameSrc ? (
                          <div className="flex flex-col items-center w-full">
                            <p className="text-xs text-green-600 mb-2 font-medium">Custom frame applied!</p>
                            <button
                              onClick={() => {
                                setCustomFrameSrc(null);
                                setFrameTransform({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
                                setImageTransforms(new Array(images.length).fill({ x: 0, y: 0, scaleX: 1, scaleY: 1 }));
                              }}
                              className="text-xs text-red-500 hover:text-red-700 underline mb-4"
                            >
                              Remove Frame
                            </button>

                            <div className="w-full border-t border-gray-200 pt-4 mt-2">
                              <h4 className="text-sm font-medium mb-3 text-gray-700 text-left">Adjustments</h4>

                              <div className="flex flex-col gap-2 mb-4">
                                <select
                                  value={selectedEditElement}
                                  onChange={(e) => setSelectedEditElement(e.target.value)}
                                  className="w-full p-2 bg-white border border-gray-300 rounded-md text-sm text-gray-800"
                                >
                                  <option value="frame">Custom Frame Overlay</option>
                                  {images.map((_, i) => (
                                    <option key={i} value={`photo-${i}`}>Photo {i + 1}</option>
                                  ))}
                                </select>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      const elements = ['frame', ...images.map((_, i) => `photo-${i}`)];
                                      const idx = elements.indexOf(selectedEditElement);
                                      const prevIdx = (idx - 1 + elements.length) % elements.length;
                                      setSelectedEditElement(elements[prevIdx]);
                                    }}
                                    className="flex-1 p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center text-gray-600 text-xs font-medium"
                                    aria-label="Previous element"
                                  >
                                    ← Prev
                                  </button>

                                  <button
                                    onClick={() => {
                                      const elements = ['frame', ...images.map((_, i) => `photo-${i}`)];
                                      const idx = elements.indexOf(selectedEditElement);
                                      const nextIdx = (idx + 1) % elements.length;
                                      setSelectedEditElement(elements[nextIdx]);
                                    }}
                                    className="flex-1 p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center text-gray-600 text-xs font-medium"
                                    aria-label="Next element"
                                  >
                                    Next →
                                  </button>
                                </div>
                              </div>

                              <div className="text-left text-sm text-gray-500 mt-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p>👉 <strong>Select an element</strong> from the dropdown.</p>
                                <p className="mt-1">👉 <strong>Drag</strong> it on the preview area to move.</p>
                                <p className="mt-1">👉 <strong>Drag the corners</strong> to resize or stretch.</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <FileImage size={24} className="text-gray-400 mb-2" />
                            <p className="text-xs text-gray-500 mb-3">Upload a PNG file with transparent cutouts</p>
                            <label className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:bg-gray-50 transition">
                              Select File
                              <input
                                type="file"
                                accept="image/png"
                                className="hidden"
                                onChange={handleFrameUpload}
                              />
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* Colors Tab */}
                {activeTab === "colors" && (
                  <div className="space-y-4">
                    {/* Background Color selection */}
                    <ColorPicker
                      color={cardColor}
                      onChange={setCardColor}
                      label="Background Color"
                    />

                    {/* Color presets */}
                    <div className="mb-4">
                      <h3 className="text-xs font-medium mb-2 text-gray-500">Presets</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {colorPresets.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setCardColor(color)}
                            className="w-6 h-6 rounded-full border hover:scale-110 transition"
                            style={{
                              backgroundColor: color,
                              borderColor: color === "#ffffff" ? "#e0e0e0" : "white"
                            }}
                            aria-label={`Color preset: ${color}`}
                          ></button>
                        ))}
                      </div>
                    </div>

                    {/* Border Color */}
                    <ColorPicker
                      color={borderColor}
                      onChange={setBorderColor}
                      label="Border Color"
                    />
                  </div>
                )}

                {/* Layout Tab */}
                {activeTab === "layout" && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-3 text-gray-700 uppercase tracking-wider">Layout Settings</h3>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-gray-100">
                      <div className="pb-4 border-b border-gray-100">
                        <h3 className="text-xs font-medium mb-3 text-gray-700">Image Order</h3>
                        <div className="space-y-2">
                          {images.map((img, i) => (
                            <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded overflow-hidden bg-gray-200 relative mr-3">
                                  <NextImage src={img.src} alt={`img-${i}`} fill style={{objectFit:'cover', filter: img.filter?.includes('(') ? img.filter : (filterStyles[img.filter]?.filter || 'none'), transform: "scaleX(-1)"}} />
                                </div>
                                <span className="text-xs text-gray-600">Photo {i + 1}</span>
                              </div>
                              <div className="flex space-x-1">
                                <button 
                                  onClick={() => moveImage(i, -1)}
                                  disabled={i === 0}
                                  className="p-1.5 text-gray-500 rounded bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                                  title="Move Up"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                                </button>
                                <button 
                                  onClick={() => moveImage(i, 1)}
                                  disabled={i === images.length - 1}
                                  className="p-1.5 text-gray-500 rounded bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                                  title="Move Down"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <RangeSlider
                        label="Strip Width"
                        value={stripWidth}
                        onChange={setStripWidth}
                        min={200}
                        max={800}
                      />

                      <RangeSlider
                        label="Photo Spacing"
                        value={stripGap}
                        onChange={setStripGap}
                        min={4}
                        max={24}
                      />

                      <RangeSlider
                        label="Strip Padding"
                        value={stripPadding}
                        onChange={setStripPadding}
                        min={8}
                        max={40}
                      />

                      <RangeSlider
                        label="Border Radius"
                        value={borderRadius}
                        onChange={setBorderRadius}
                        min={0}
                        max={24}
                      />

                      <RangeSlider
                        label="Border Width"
                        value={borderWidth}
                        onChange={setBorderWidth}
                        min={0}
                        max={8}
                      />
                    </div>
                  </div>
                )}

                {/* Extras Tab */}
                {activeTab === "extras" && (
                  <div className="space-y-3">
                    {/* Date format options */}
                    <div>
                      <h3 className="text-xs font-medium mb-2 text-gray-700">Date Format</h3>
                      <div className="grid grid-cols-1 gap-1.5">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="dateNone"
                            checked={!showDate}
                            onChange={() => setShowDate(false)}
                            className="mr-2"
                          />
                          <label htmlFor="dateNone" className="text-xs text-gray-600">No date</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="dateShort"
                            checked={showDate && dateFormat === "short"}
                            onChange={() => { setShowDate(true); setDateFormat("short") }}
                            className="mr-2"
                          />
                          <label htmlFor="dateShort" className="text-xs text-gray-600">Short ({dateFormats.short})</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="dateLong"
                            checked={showDate && dateFormat === "long"}
                            onChange={() => { setShowDate(true); setDateFormat("long") }}
                            className="mr-2"
                          />
                          <label htmlFor="dateLong" className="text-xs text-gray-600">Long</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="dateTime"
                            checked={showDate && dateFormat === "time"}
                            onChange={() => { setShowDate(true); setDateFormat("time") }}
                            className="mr-2"
                          />
                          <label htmlFor="dateTime" className="text-xs text-gray-600">Date & Time</label>
                        </div>
                      </div>
                    </div>

                    {/* Font Color Picker */}
                    <div>
                      <h3 className="text-xs font-medium mb-2 text-gray-700">Date Font Color</h3>
                      <div className="flex items-center gap-2">
                        {/* Color Preview */}
                        <div
                          className="w-6 h-6 rounded-lg border border-gray-200"
                          style={{ backgroundColor: dateFontColor }}
                          aria-label={`Date font color preview: ${dateFontColor}`}
                        ></div>
                        {/* Color Input */}
                        <input
                          type="color"
                          value={dateFontColor}
                          onChange={(e) => setDateFontColor(e.target.value)}
                          className="w-full h-6 cursor-pointer rounded"
                          aria-label="Date font color picker"
                        />
                      </div>
                      {/* Preset Colors */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {fontColorPresets.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setDateFontColor(color)}
                            className="w-5 h-5 rounded-full border hover:scale-110 transition"
                            style={{
                              backgroundColor: color,
                              borderColor: color === "#ffffff" ? "#e0e0e0" : "white"
                            }}
                            aria-label={`Font color preset: ${color}`}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Stickers Tab */}
                {activeTab === "stickers" && (
                  <div className="space-y-4 flex flex-col">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-medium text-gray-700">Add Stickers</h3>
                      
                      {/* Emoji Search */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search emojis..."
                          value={emojiSearch}
                          onChange={(e) => setEmojiSearch(e.target.value)}
                          className="w-full p-2 pl-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 overflow-y-auto max-h-[300px] p-1 scrollbar-thin scrollbar-thumb-gray-200">
                      {(emojiSearch 
                        ? ALL_EMOJIS.filter(e => e.name.toLowerCase().includes(emojiSearch.toLowerCase()))
                        : ALL_EMOJIS
                      ).map((item, i) => (
                        <button
                          key={i}
                          title={item.name}
                          onClick={() => {
                            stickerCounter.current += 1;
                            const newSticker = {
                              id: stickerCounter.current,
                              emoji: item.char,
                              x: 100,
                              y: 100,
                              scaleX: 1,
                              scaleY: 1,
                              rotate: 0,
                              flipped: false
                            };
                            setStickers(prev => [...prev, newSticker]);
                            setSelectedEditElement(`sticker-${newSticker.id}`);
                          }}
                          className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110 active:scale-95"
                        >
                          {item.char}
                        </button>
                      ))}
                    </div>

                    {stickers.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-medium text-gray-500 mb-2">Manage Stickers</h4>
                        <div className="space-y-2">
                          {stickers.map((s) => (
                            <div key={s.id} className={`flex items-center justify-between p-2 rounded-md transition-colors ${selectedEditElement === `sticker-${s.id}` ? 'bg-blue-50 ring-1 ring-blue-200' : 'bg-gray-50'}`}>
                              <span className="text-xl">{s.emoji}</span>
                              <div className="flex items-center gap-1">
                                <button
                                  title={selectedEditElement === `sticker-${s.id}` ? 'Đang chọn' : 'Chọn để chỉnh sửa'}
                                  onClick={() => setSelectedEditElement(`sticker-${s.id}`)}
                                  className={`p-1.5 rounded-md transition-colors ${selectedEditElement === `sticker-${s.id}` ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-200 hover:text-gray-600'}`}
                                >
                                  <MousePointer size={14} />
                                </button>
                                <button
                                  title="Xóa sticker"
                                  onClick={() => {
                                    setStickers(stickers.filter(st => st.id !== s.id));
                                    if (selectedEditElement === `sticker-${s.id}`) setSelectedEditElement(null);
                                  }}
                                  className="p-1.5 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Draw Tab */}
                {activeTab === "draw" && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Free Drawing</h3>

                    <ColorPicker
                      color={brushColor}
                      onChange={setBrushColor}
                      label="Brush Color"
                    />

                    <RangeSlider
                      label="Brush Size"
                      value={brushSize}
                      onChange={setBrushSize}
                      min={1}
                      max={50}
                    />

                    <button
                      onClick={() => setDrawingPaths([])}
                      className="w-full py-2 bg-red-50 text-red-600 rounded-md text-xs font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash size={14} /> Clear Drawing
                    </button>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-[11px] text-blue-700 leading-relaxed">
                        <strong>How to draw:</strong> Use your mouse or finger directly on the photo strip preview to draw.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons - Simplified */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2">
              {saveSuccess && (
                <div className="bg-green-50 text-green-700 text-xs p-1.5 rounded mb-2 text-center">
                  Photo strip saved successfully!
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed text-sm font-medium"
              >
                {isSaving ? "Saving..." : (
                  <>
                    <Download size={16} className="mr-1.5" />
                    Save Photo
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                disabled={isSaving}
                className="w-full flex items-center justify-center px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-sm font-medium"
              >
                {isSaving ? "Processing..." : (
                  <>
                    <Share size={16} className="mr-1.5" />
                    Share
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Photo Strip with preview area */}
          <div className="flex-1 flex justify-center items-center overflow-auto p-4">
            <div
              ref={photoStripRef}
              className="relative rounded-lg shadow-sm transition-all duration-300 flex flex-col justify-center items-center"
              style={
                customFrameSrc
                  ? {
                    // Custom frame mode overrides
                    width: stripMinimized ? (printFormat === 'strip' ? '120px' : '240px') : (printFormat === 'strip' ? '250px' : '500px'),
                    aspectRatio: printFormat === 'strip' ? '2/6' : '4/6',
                    transform: stripMinimized ? 'scale(0.8)' : 'scale(1)',
                    transformOrigin: 'top center',
                    backgroundColor: 'transparent',
                  }
                  : {
                    // Normal mode
                    backgroundColor: cardColor,
                    padding: `${stripPadding}px`,
                    width: stripMinimized ? (printFormat === 'strip' ? '120px' : '240px') : `${stripWidth}px`,
                    aspectRatio: printFormat === 'strip' ? '2/6' : '4/6',
                    transform: stripMinimized ? 'scale(0.8)' : 'scale(1)',
                    transformOrigin: 'top center',
                    display: 'flex',
                    flexDirection: 'column'
                  }
              }
            >
              {customFrameSrc ? (
                <>
                  {/* Clip container for photos and frame */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg z-0">
                    {/* Photo Grid underneath the custom frame */}
                    <div className="absolute inset-0" style={{
                      display: 'grid',
                      gridTemplateColumns: printFormat === 'strip' || (printFormat === 'postcard' && images.length <= 2) ? '1fr' : 'repeat(2, 1fr)',
                      gridTemplateRows: `repeat(${Math.ceil(images.length / (printFormat === 'strip' || (printFormat === 'postcard' && images.length <= 2) ? 1 : 2)) || 1}, 1fr)`,
                      gap: '0px'
                    }}>
                      {images.map((image, index) => {
                        const imgTransform = imageTransforms[index] || { x: 0, y: 0, scaleX: 1, scaleY: 1 };
                        return (
                          <div key={index} className="relative w-full h-full bg-transparent" data-filter={image.filter}>
                            <div style={{
                              transform: `translate(${imgTransform.x}px, ${imgTransform.y}px) scale(${imgTransform.scaleX}, ${imgTransform.scaleY})`,
                              width: '100%',
                              height: '100%',
                              position: 'relative'
                            }}>
                              <div
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  backgroundImage: `url(${image.src})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  filter: image.filter?.includes('(') ? image.filter : (filterStyles[image.filter]?.filter || 'none'),
                                  transform: "scaleX(-1)"
                                }}
                                data-filter={image.filter}
                              />
                              {image.filter === 'film' && (
                                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.43)_100%)]" />
                                  <div className="absolute inset-0 bg-[#9725]/30" />
                                  <div 
                                    className="absolute inset-0 opacity-20 mix-blend-overlay"
                                    style={{ 
                                      backgroundImage: 'url(https://i.ibb.co/vJt5HSh/noisy-texture-300x300-o10-d10-c-a82851-t1.png)',
                                      backgroundRepeat: 'repeat'
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* The transparent PNG overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none" style={{
                      transform: `translate(${frameTransform.x}px, ${frameTransform.y}px) scale(${frameTransform.scaleX}, ${frameTransform.scaleY})`
                    }}>
                      <NextImage
                        src={customFrameSrc}
                        alt="Custom Frame"
                        fill
                        className="pointer-events-none"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>

                  {/* Interactive Overlays Container (Top-most layer) */}
                  <div className="absolute inset-0 z-50 pointer-events-none">
                    {/* Frame Interactive Box */}
                    {selectedEditElement === 'frame' && (
                      <div
                        className="absolute inset-0 border-2 border-dashed border-blue-500 bg-blue-500/10 cursor-move pointer-events-auto"
                        style={{
                          transform: `translate(${frameTransform.x}px, ${frameTransform.y}px) scale(${frameTransform.scaleX}, ${frameTransform.scaleY})`
                        }}
                        onMouseDown={(e) => handlePointerDown(e, 'move')}
                      >
                        {/* Resize Handles */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize" onMouseDown={(e) => handlePointerDown(e, 'resize-tl')} />
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nesw-resize" onMouseDown={(e) => handlePointerDown(e, 'resize-tr')} />
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nesw-resize" onMouseDown={(e) => handlePointerDown(e, 'resize-bl')} />
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize" onMouseDown={(e) => handlePointerDown(e, 'resize-br')} />
                      </div>
                    )}

                    {/* Photos Interactive Boxes */}
                    {images.map((_, i) => {
                      if (selectedEditElement !== `photo-${i}`) return null;
                      const imgTransform = imageTransforms[i] || { x: 0, y: 0, scaleX: 1, scaleY: 1 };

                      // Calculate grid cell bounds
                      const cols = printFormat === 'strip' || (printFormat === 'postcard' && images.length <= 2) ? 1 : 2;
                      const rows = Math.ceil(images.length / cols) || 1;
                      const row = Math.floor(i / cols);
                      const col = i % cols;

                      const top = `${(row * 100) / rows}%`;
                      const left = `${(col * 100) / cols}%`;
                      const width = `${100 / cols}%`;
                      const height = `${100 / rows}%`;

                      return (
                        <div
                          key={`overlay-${i}`}
                          className="absolute"
                          style={{ top, left, width, height }}
                        >
                          <div
                            className="absolute inset-0 border-2 border-dashed border-blue-500 bg-blue-500/10 cursor-move pointer-events-auto"
                            style={{
                              transform: `translate(${imgTransform.x}px, ${imgTransform.y}px) scale(${imgTransform.scaleX}, ${imgTransform.scaleY})`
                            }}
                            onMouseDown={(e) => handlePointerDown(e, 'move')}
                          >
                            {/* Resize Handles */}
                            <div className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize" onMouseDown={(e) => handlePointerDown(e, 'resize-tl')} />
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nesw-resize" onMouseDown={(e) => handlePointerDown(e, 'resize-tr')} />
                            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nesw-resize" onMouseDown={(e) => handlePointerDown(e, 'resize-bl')} />
                            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize" onMouseDown={(e) => handlePointerDown(e, 'resize-br')} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  {/* Photo strip layout */}
                  <div
                    className="w-full h-full relative z-0"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignContent: 'start',
                      gap: `${stripGap}px`
                    }}
                  >
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden bg-white"
                        data-filter={image.filter} // Store filter type
                        style={{
                          borderRadius: `${borderRadius}px`,
                          border: `${borderWidth}px solid ${borderColor}`,
                          width: printFormat === 'strip' || (printFormat === 'postcard' && images.length <= 2) ? '100%' : `calc(50% - ${stripGap / 2}px)`,
                          height: printFormat === 'strip' || (printFormat === 'postcard' && images.length <= 2)
                            ? `calc(${100 / images.length}% - ${stripGap}px)`
                            : `calc(${100 / Math.ceil(images.length / 2)}% - ${stripGap}px)`,
                          minHeight: '100px'
                        }}
                      >
                        {/* Using Next.js Image component instead of img for performance optimization */}
                        <div 
                          className="relative w-full h-full cursor-move"
                          onPointerDown={(e) => handlePanPointerDown(e, index)}
                        >
                          <div
                            draggable={false}
                            style={{
                              position: "absolute",
                              inset: 0,
                              backgroundImage: `url(${image.src})`,
                              backgroundSize: "cover",
                              backgroundPosition: `${imagePans[index]?.x ?? 50}% ${imagePans[index]?.y ?? 50}%`,
                              backgroundRepeat: "no-repeat",
                              filter: image.filter?.includes('(') ? image.filter : (filterStyles[image.filter]?.filter || 'none'),
                              transform: "scaleX(-1)" // Keep consistent with camera view
                            }}
                            data-filter={image.filter}
                          />
                          {image.filter === 'film' && (
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.43)_100%)]" />
                              <div className="absolute inset-0 bg-[#9725]/30" />
                              <div 
                                className="absolute inset-0 opacity-20 mix-blend-overlay"
                                style={{ 
                                  backgroundImage: 'url(https://i.ibb.co/vJt5HSh/noisy-texture-300x300-o10-d10-c-a82851-t1.png)',
                                  backgroundRepeat: 'repeat'
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Date stamp at bottom - only show if enabled */}
                  {showDate && (
                    <div
                      className="text-center mt-1"
                      style={{
                        color: dateFontColor,
                        fontSize: stripMinimized ? '9px' : '11px',
                        lineHeight: '1',
                      }}
                    >
                      <span>
                        {dateFormats[dateFormat]}
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* Stickers Layer - always interactive */}
              <div className="absolute inset-0 z-20 overflow-hidden" style={{ pointerEvents: 'none' }}>
                {stickers.map((sticker) => {
                  const rotate = sticker.rotate ?? 0;
                  const isSelected = selectedEditElement === `sticker-${sticker.id}`;
                  return (
                    <div
                      key={sticker.id}
                      className="absolute"
                      style={{
                        left: `${sticker.x}px`,
                        top: `${sticker.y}px`,
                        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${Math.abs(sticker.scaleX)}, ${Math.abs(sticker.scaleY)})`,
                        cursor: 'move',
                        fontSize: '48px',
                        userSelect: 'none',
                        outline: isSelected ? '2px dashed #3b82f6' : 'none',
                        outlineOffset: '6px',
                        padding: '8px',
                        pointerEvents: 'auto',
                        touchAction: 'none'
                      }}
                      onPointerDown={(e) => handleStickerPointerDown(e, sticker.id, 'move')}
                    >
                      <div style={{
                        transform: `scaleX(${sticker.flipped ? -1 : 1})`,
                        display: 'inline-block'
                      }}>
                        {sticker.emoji}
                      </div>

                      {isSelected && (
                        <>
                          {/* Rotate handle - right center */}
                          <div
                            className="absolute flex items-center justify-center"
                            style={{
                              top: '50%',
                              right: '-36px',
                              transform: 'translateY(-50%)',
                              width: '24px',
                              height: '24px',
                              background: 'white',
                              borderRadius: '50%',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                              border: '2px solid #3b82f6',
                              pointerEvents: 'auto',
                              cursor: 'grab',
                              touchAction: 'none',
                              zIndex: 10
                            }}
                            onPointerDown={(e) => handleStickerPointerDown(e, sticker.id, 'rotate')}
                          >
                            <RotateCcw size={12} color="#3b82f6" />
                          </div>

                          {/* Resize handle - bottom right */}
                          <div
                            className="absolute flex items-center justify-center"
                            style={{
                              bottom: '-10px',
                              right: '-10px',
                              width: '22px',
                              height: '22px',
                              background: '#3b82f6',
                              borderRadius: '50%',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                              border: '2px solid white',
                              pointerEvents: 'auto',
                              cursor: 'se-resize',
                              touchAction: 'none',
                              fontSize: '10px',
                              color: 'white'
                            }}
                            onPointerDown={(e) => handleStickerPointerDown(e, sticker.id, 'resize')}
                          >
                            <Move size={11} color="white" />
                          </div>

                          {/* Delete handle - top right */}
                          <div
                            className="absolute flex items-center justify-center"
                            style={{
                              top: '-10px',
                              right: '-10px',
                              width: '22px',
                              height: '22px',
                              background: '#ef4444',
                              borderRadius: '50%',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                              border: '2px solid white',
                              pointerEvents: 'auto',
                              cursor: 'pointer',
                              touchAction: 'none',
                              zIndex: 10
                            }}
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              setStickers(prev => prev.filter(s => s.id !== sticker.id));
                              setSelectedEditElement(null);
                            }}
                          >
                            <X size={12} color="white" />
                          </div>

                          {/* Flip handle - top left */}
                          <div
                            className="absolute flex items-center justify-center hover:scale-110 transition-transform"
                            style={{
                              top: '-10px',
                              left: '-10px',
                              width: '22px',
                              height: '22px',
                              background: '#8b5cf6', // purple color to distinguish
                              borderRadius: '50%',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                              border: '2px solid white',
                              pointerEvents: 'auto',
                              cursor: 'pointer',
                              touchAction: 'none',
                              zIndex: 10
                            }}
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              setStickers(prev => prev.map(s => s.id === sticker.id ? { ...s, flipped: !s.flipped } : s));
                            }}
                            title="Flip Horizontal"
                          >
                            <FlipHorizontal size={12} color="white" />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Drawing Layer - Topmost, only active in draw tab */}
              <canvas
                ref={(el) => {
                  canvasRef.current = el;
                  if (el && el.width === 0) {
                    el.width = el.offsetWidth || 300;
                    el.height = el.offsetHeight || 400;
                  }
                }}
                className="absolute inset-0 z-30 w-full h-full"
                style={{
                  cursor: activeTab === 'draw' ? 'crosshair' : 'default',
                  pointerEvents: activeTab === 'draw' ? 'auto' : 'none',
                  touchAction: 'none'
                }}
                onPointerDown={handleCanvasPointerDown}
                onPointerMove={handleCanvasPointerMove}
                onPointerUp={handleCanvasPointerUp}
                onPointerLeave={handleCanvasPointerUp}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Define the main export component with Suspense boundary
export default function BackgroundPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <BackgroundContent />
    </Suspense>
  );
}