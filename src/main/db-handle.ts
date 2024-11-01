import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { getDb } from './db';

/**
 * 绑定本地数据库操作方法
 */
export function bindDbHandle(): void {
  //条件查询文档
  ipcMain.handle('find', async (event: IpcMainInvokeEvent, args: any[]) => {
    event.preventDefault();
    const [docName, condition, sortField, asc] = args;
    const db = getDb(docName);
    try {
      const r = await db.find(condition, sortField, asc);
      return r;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });

  //条件查询文档，返回第1条
  ipcMain.handle('find-one', async (event: IpcMainInvokeEvent, args: any[]) => {
    event.preventDefault();
    const [docName, condition] = args;
    const db = getDb(docName);
    try {
      const r = await db.findOne(condition);
      return r;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });

  //分页查询
  ipcMain.handle(
    'find-page',
    async (event: IpcMainInvokeEvent, args: any[]) => {
      event.preventDefault();
      const [docName, condition, pageIndex, pageSize, sortField, asc] = args;
      const db = getDb(docName);
      try {
        const r = await db.findByPage(
          condition,
          pageIndex,
          pageSize,
          sortField,
          asc,
        );
        return r;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
  );

  //查询全部文档
  ipcMain.handle('all', async (event: IpcMainInvokeEvent, args: any[]) => {
    event.preventDefault();
    const [docName] = args;
    const db = getDb(docName);
    try {
      const r = await db.all();
      return r;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });

  //插入db文档
  ipcMain.handle('insert', async (event: IpcMainInvokeEvent, args: any[]) => {
    event.preventDefault();
    const [docName, doc] = args;
    const db = getDb(docName);
    try {
      const r = await db.insert(doc);
      return r;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });

  //删除db文档
  ipcMain.handle('remove', async (event: IpcMainInvokeEvent, args: any[]) => {
    event.preventDefault();
    const [docName, condition, multi] = args;
    const db = getDb(docName);
    try {
      const count = await db.remove(condition, multi);
      return count;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });

  //更新db文档
  ipcMain.handle('update', async (event: IpcMainInvokeEvent, args: any[]) => {
    event.preventDefault();
    const [docName, condition, newDoc, multi] = args;
    const db = getDb(docName);
    try {
      const count = await db.update(condition, newDoc, multi);
      return count;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });

  //查询结果记录数
  ipcMain.handle('count', async (event: IpcMainInvokeEvent, args: any[]) => {
    event.preventDefault();
    const [docName, condition] = args;
    const db = getDb(docName);
    try {
      const count = await db.count(condition);
      return count;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });
}
