const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  try {
    // Handle the case where the domin is not avaia ble yet
    if (!apiDomain) {
      return [];
    }
    const response = await fetch(`${apiDomain}/properties`);

    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
    return response.json();
  } catch (error) {
    console.log(error)
    return [];
  }
}

export {fetchProperties}; 