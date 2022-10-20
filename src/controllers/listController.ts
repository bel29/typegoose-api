import ShoppingListModel from "../models/ShoppingList";
import { Request, Response } from "express";
import {
  CreateListInput,
  GetIdInput,
  UpdateListInput,
} from "../schema/shoppingListSchema";
import { save, toDelete, update } from "../handlers/listHandler";
class listController {
  constructor() {}

  getLists = async (req: Request, res: Response): Promise<any> => {
    try {
      const lists = await ShoppingListModel.find();
      return res.json({ success: true, result: lists });
      return lists;
    } catch (err) {
      throw "Problem getting lists";
    }
  };

  getById = async (
    req: Request<{ id: string }, {}, GetIdInput>,
    res: Response
  ): Promise<any> => {
    try {
      const params = req.params;
      const list = await ShoppingListModel.findOne({ _id: params.id });
      console.log(list);
      if (!list) {
        return res.status(404).json({
          success: false,
          message: "List doesn't exist",
        });
      }
      return res.json({ success: true, result: list });
    } catch (err) {
      throw res.status(500).json({
        success: false,
        message: "An error has ocurred getting the list",
        error: err,
      });
    }
  };

  createList = async (
    req: Request<{}, {}, CreateListInput>,
    res: Response
  ): Promise<any> => {
    const body = req.body;
    console.log(body.items);
    try {
      const list = await save(body);
      return res.json({ success: true, result: "List saved " });
    } catch (err) {
      throw err;
    }
  };

  updateList = async (
    req: Request<{ id: string }, {}, UpdateListInput>,
    res: Response
  ): Promise<any> => {
    const {
      params: { id },
    } = req;
    try {
      const list = await update(id, req.body);
      if (list != null)
        return res.json({ success: true, result: "List saved " });
      else {
        throw "List not found";
      }
    } catch (err) {
      throw res.json({ success: false, result: err });
    }
  };

  deleteById = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response
  ): Promise<any> => {
    const {
      params: { id },
    } = req;
    try {
      const list = await toDelete(id);
      if (list == null)
        return res.json({
          success: true,
          result: "List deleted succesfully! ",
        });
    } catch (err) {
      throw res.json({ success: false, result: err });
    }
  };
}
export default listController;
