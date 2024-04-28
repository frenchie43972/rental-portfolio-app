import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utilis/getSessionUser";

// GET api/properties/:id
export const GET = async (request, {params}) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) return new Response('Property Not Found', {status: 404});

    return new Response(JSON.stringify(property), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response('Something went Wrong', {status: 500});
  }
};

// DELETE api/properties/:id
export const DELETE = async (request, {params}) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is Required', {status: 401});
    }

    await connectDB();

    const {userId} = sessionUser;

    const property = await Property.findById(propertyId);

    if (!property) return new Response('Property Not Found', {status: 404});

    // Verifies ownership of the listing
    if (property.owner.toString() !== userId) {
      return new Response('Unauthorized', {status: 401});
    }

     // extract public id's from image url in DB
    const publicIds = property.images.map((imageUrl) => {
      const parts = imageUrl.split('/');
      return parts.at(-1).split('.').at(0);
    });
 
    // Delete images from Cloudinary
    if (publicIds.length > 0) {
      for (let publicId of publicIds) {
        await cloudinary.uploader.destroy('propertypulse/' + publicId);
      }
    }

    await property.deleteOne();

    return new Response('Property Deleted', {status: 200});
  } catch (error) {
    console.log(error);
    return new Response('Something went Wrong', {status: 500});
  }
};