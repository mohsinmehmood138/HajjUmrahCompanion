// Helper functions

import {Alert, Dimensions, PixelRatio, Platform} from 'react-native';
// import Toast from 'react-native-simple-toast';
import {UNEXPECTED_ERROR} from '@shared/utils/enums';

// Get device screen width.
export const scrWidth = Dimensions.get('window').width;

// Get device screen height.
export const scrHeight = Dimensions.get('window').height;

// Convert percentage to responsive width.
const widthPercentageToDP = (widthPercent: string) => {
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((scrWidth * elemWidth) / 100);
};

// Convert percentage to responsive height.
const heightPercentageToDP = (heightPercent: string) => {
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((scrHeight * elemHeight) / 100);
};

// Export responsive width and height utilities.
export {widthPercentageToDP as WP, heightPercentageToDP as HP};

// Check if the platform is iOS.
export const isIOS = () => Platform.OS === 'ios';

// Create a debounced version of a function.
export const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId); // Clear existing timeout.
    timeoutId = setTimeout(() => func(...args), delay); // Set new timeout.
  };
};

// Displays alert with a type, description, and optional action on button press.
export function showAlert(type: string, des: string, onPress?: () => void) {
  Alert.alert(type, des, [
    {
      onPress: onPress,
    },
  ]);
}

// Displays toast with a message
export const showToast = (
  message: string = UNEXPECTED_ERROR,
  options: any = {},
) => {
  // const {duration = Toast.SHORT, position = Toast.BOTTOM} = options;
  // Toast.showWithGravity(message, duration, position);
};

import {collection, doc, setDoc} from 'firebase/firestore';
import {db} from '@src/config/firebaseConfig';

export const uploadDataToFirestore = async (
  collectionName: string,
  data: any[],
) => {
  try {
    for (const category of data) {
      const categoryRef = doc(db, collectionName, category.id.toString());

      await setDoc(categoryRef, category);

      if (category.items && category.items.length > 0) {
        for (const item of category.items) {
          const itemRef = doc(
            collection(categoryRef, 'items'),
            item.id.toString(),
          );
          await setDoc(itemRef, item);
        }
      }
    }
  } catch (error) {
    console.error('Error uploading data to Firestore:', error);
  }
};
