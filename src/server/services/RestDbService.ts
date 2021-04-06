//const Airtable = require('airtable-node');
import AsyncAirtable = require('asyncairtable');
import { AirtableRecord, SelectOptions } from 'asyncairtable/lib/@types';
import { Inject } from 'typedi';
import { BaseModel } from '../../shared/models/BaseModel';

@Inject()
export class RestDbService {
  async getDatas<T extends BaseModel>(
    baseId: string,
    tableName: string,
    options?: SelectOptions
  ): Promise<T[]> {
    const airtable = this.getAirTableClient(baseId, tableName);
    const records: AirtableRecord[] = await airtable.select(tableName, options);

    const body = records
      .map((o: AirtableRecord) => {
        const fields = o.fields;
        fields.id = o.id;
        return fields;
      })
      .map((fields) => {
        const keys = Object.keys(fields);
        const obj = {};
        for (let key of keys) {
          const v = fields[key];
          obj[key] = v;
        }

        return obj;
      }) as T[];

    return body;
  }

  async saveData<T extends BaseModel>(baseId: string, tableName: string, data: T) {
    const airtable = this.getAirTableClient(baseId, tableName);
    //const body = await airtable.create({ fields: data });
    const body = await airtable.createRecord(tableName, data);

    console.dir(body);
    return body;
  }

  async updateData<T extends BaseModel>(baseId: string, tableName: string, data: T) {
    const id = data.id;
    delete data.id;
    const airtable = this.getAirTableClient(baseId, tableName);
    // const body = await airtable.update(id, data);
    const body = await airtable.updateRecord(tableName, {
      id: data.id,
      fields: data,
    });
    console.dir(body);
    return body;
  }

  private getAirTableClient(baseId: string, tableName: string) {
    // const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API })
    //   .base(baseId)
    //   .table(tableName);
    const apiKey = process.env.AIRTABLE_API;
    const airtable = new AsyncAirtable(apiKey, baseId);

    return airtable;
  }
}
