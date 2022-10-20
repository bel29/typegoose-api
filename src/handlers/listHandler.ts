import ShoppingListModel from "../models/ShoppingList";

export async function save(list: any) {
  try {
    const listToSave = new ShoppingListModel({
      createdDate: new Date(),
      dueDate: list.dueDate != undefined ? list.dueDate : new Date(),
      items: list.items,
    });
    listToSave.save();
    return;
  } catch (err) {
    throw err;
  }
}
export async function update(id: string, body: any) {
  try {
    const items = body.items;
    const List = await ShoppingListModel.findOne({ _id: id });
    const dueDate = body.dueDate ? body.dueDate : List?.dueDate;
    const ListUpdated = {
      items,
      dueDate,
    };
    let lst = await ShoppingListModel.findOneAndUpdate({ List }, ListUpdated);
    return lst;
  } catch (err) {
    throw err;
  }
}

export async function toDelete(id: string) {
  const List = await ShoppingListModel.findOne({ _id: id });
  await ShoppingListModel.deleteOne({ _id: id })
    .then(function () {
      return null; // Success
    })
    .catch(function (err) {
      throw "Error while deleting " + err; // Failure
    });
}
