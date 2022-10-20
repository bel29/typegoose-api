import ItemModel from "../models/Item";

export async function save(name: string, description: string, cost: number) {
  try {
    const itemToSave = new ItemModel({
      name,
      description,
      cost,
    });
    itemToSave.save();
    return;
  } catch (err) {
    throw err;
  }
}

export async function update(id: string, body: any) {
  try {
    const name = body.name;
    const description = body.description;
    const cost = body.cost;
  
      const item = ItemModel.findOne({_id:id});
      const itemUpdated = {
        name,
        description,
        cost,
      };
      const newItem = await ItemModel.findOneAndUpdate({item},itemUpdated)
      console.log(newItem)
      return newItem;
    } catch (error) {
      throw error;
    }
}
export async function toDelete(id: string) {
  const Item = await ItemModel.findOne({ _id: id });
  await ItemModel.deleteOne({ _id: id })
    .then(function () {
      return null; // Success
    })
    .catch(function (err) {
      throw "Error while deleting item " + err; // Failure
    });
  
}
