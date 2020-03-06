const Airtable = require('airtable-node');
import { Inject } from 'typedi';
import { BaseModel } from '../../shared/models/BaseModel';

@Inject()
export class RestDbService {
  async getDatas<T extends BaseModel>(
    baseId: string,
    tableName: string,
    query?: any[]
  ): Promise<T[]> {
    const airtable = this.getAirTableClient(baseId, tableName);

    const { records } = await airtable.list();

    const body: T[] = records.map(o => {
      const fields = o.fields;
      fields.id = o.id;
      return fields;
    }) as T[];

    return body;
  }

  async saveData<T extends BaseModel>(baseId: string, tableName: string, data: T) {
    const airtable = this.getAirTableClient(baseId, tableName);
    const body = await airtable.create({ fields: data });

    console.dir(body);
  }

  async updateData<T extends BaseModel>(baseId: string, tableName: string, id: string, data: T) {
    const airtable = this.getAirTableClient(baseId, tableName);
    const body = await airtable.update(data.id, data);

    console.dir(body);
  }

  private getAirTableClient(baseId: string, tableName: string) {
    const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API })
      .base(baseId)
      .table(tableName);

    return airtable;
  }
}
