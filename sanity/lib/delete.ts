import { client } from './client';

const DOC_TYPE = 'product'; // Replace with the type you want to delete

export async function deleteAllOfType(type = DOC_TYPE) {
  await client.delete({ query: `*[_type == $type]`, params: { type } })
    .then((res) => {
      console.log(res, 'All documents deleted successfully!');
    })
    .catch((err) => {
      console.error(err);
    })
}

export async function deleteCategoryById(categoryId: string) {
  await client.delete({ query: `*[_type == "category" && _id == $id][0]`, params: { id: categoryId } })
    .then((res) => {
      console.log(res, 'Category deleted successfully!');
    })
    .catch((err) => {
      console.error(err);
    })
}