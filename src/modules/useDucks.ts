import { ref } from "vue";
import type { newDuck, Duck } from "../interfaces/interfaces";

const API_URL = import.meta.env.VITE_API_URL;

export const useDucks = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const ducks = ref<Duck[]>([]);

  const fetchDucks = async () => {
    loading.value = true;
    try {
      const response = await fetch(API_URL + "/rubber-ducks");
      if (!response.ok) {
        throw new Error("Failed to fetch ducks");
      }
      const data: Duck[] = await response.json();
      ducks.value = data;
      //console.log("ducks fetched", ducks.value);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false; // No matter what happens, loading will be set to false
    }
  };

  const getTokenAndUserId = (): { token: string; userId: string } => {
    const token = localStorage.getItem("lsToken");
    const userId = localStorage.getItem("userIDToken");
    if (!token || !userId) {
      throw new Error("No token or user available");
    }
    return { token, userId };
  };

  const validateDuck = (duck: newDuck): void => {
    if (!duck.name) {
      throw new Error("Duck name cannot be empty");
    }
  };

  const setDefaultValues = (duck: newDuck, userId: string) => {
    return {
      name: duck.name,
      description: duck.description || "New Duck description default value",
      imageURL: duck.imageURL || "https://picsum.photos/500/500",
      price: duck.price || 23,
      onSale: duck.onSale || false,
      discountPct: duck.discountPct || 0,
      isHidden: duck.isHidden || false,
      _createdBy: userId,
    };
  };

  const addDuck = async (duck: newDuck): Promise<void> => {
    try {
      const { token, userId } = getTokenAndUserId();
      validateDuck(duck);
      const duckWithDefaults = setDefaultValues(duck, userId);

      const response = await fetch(API_URL + "/rubber-ducks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(duckWithDefaults),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "No data available");
      }
      const newDuck: Duck = await response.json();
      ducks.value.push(newDuck);
      //console.log("duck added", newDuck);
      await fetchDucks();
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const deleteDuckFromServer = async (
    id: string,
    token: string
  ): Promise<void> => {
    const response = await fetch(API_URL + `/rubber-ducks/${id}`, {
      method: "DELETE",
      headers: {
        //"Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (!response.ok) {
      console.log("Duck failed to delete");
      throw new Error("No data available");
    }
  };

  const removeDuckFromState = (id: string): void => {
    ducks.value = ducks.value.filter((duck) => duck._id !== id);
    //console.log("duck deleted", id);
  };

  const deleteDuck = async (id: string): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();

      await deleteDuckFromServer(id, token);

      removeDuckFromState(id);
      //console.log("id test: ", id);
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const updateDuckOnServer = async (
    id: string,
    updatedDuck: Partial<Duck>,
    token: string
  ): Promise<Duck> => {
    const response = await fetch(API_URL + `/rubber-ducks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(updatedDuck),
    });
    if (!response.ok) {
      throw new Error("No data available");
    }

    const responseText = await response.text();
    try {
      return JSON.parse(responseText);
    } catch {
      return { message: responseText } as unknown as Duck;
    } //return await response.json();
  };

  const updateDuckInState = (id: string, updatedDuck: Duck) => {
    const index = ducks.value.findIndex((duck) => duck._id === id);
    if (index !== -1) {
      ducks.value[index] = updatedDuck;
    }
  };

  const updateDuck = async (
    id: string,
    updatedDuck: Partial<Duck>
  ): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();
      const updatedDuckResponse = await updateDuckOnServer(
        id,
        updatedDuck,
        token
      );
      updateDuckInState(id, updatedDuckResponse);
      await fetchDucks();
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const fetchDuckById = async (id: string): Promise<Duck[] | null> => {
    try {
      const response = await fetch(API_URL + `/rubber-ducks/${id}`);
      if (!response.ok) {
        throw new Error("No data avaiveble");
      }
      const data: Duck[] = await response.json();
      //console.log("duck fetched", data);
      return data;
    } catch (err) {
      console.log("error", err);
      return null;
    }
  };

  return {
    error,
    loading,
    ducks,
    fetchDucks,
    deleteDuck,
    addDuck,
    getTokenAndUserId,
    updateDuck,
    fetchDuckById,
  };
};
