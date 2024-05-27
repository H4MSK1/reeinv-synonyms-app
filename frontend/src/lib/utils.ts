import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function textToSpeech(
  text: string,
  lang: string = "en-US"
): Promise<void> {
  if (window.speechSynthesis === undefined) {
    throw new Error("SpeechSynthesis is not supported the browser.");
  }

  const speechSynthesis = window.speechSynthesis;
  speechSynthesis.cancel();

  /**
   * Get a list of voices available on the browser.
   * This list is loaded asynchronously first time by the browser,
   * hence the "onvoiceschanged" event handler.
   */
  const getVoices = (): Promise<SpeechSynthesisVoice[]> =>
    new Promise((resolve) => {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        // Voices already loaded by the browser.
        resolve(voices);
        return;
      }

      speechSynthesis.onvoiceschanged = () =>
        resolve(speechSynthesis.getVoices());
    });

  const getVoiceByLang = async (): Promise<
    SpeechSynthesisVoice | undefined
  > => {
    try {
      const voices = await getVoices();
      return voices.find((voice) => voice.lang === lang);
    } catch (err) {
      console.error(err);
      toast.error("Cannot not play the audio in the preferred language.");
    }
  };

  const voice = await getVoiceByLang();
  if (!voice) {
    return;
  }

  // @docs https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.voice = voice;
  utterance.rate = 0.8; // Rate of speed of the speech
  speechSynthesis.speak(utterance);
}
