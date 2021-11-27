import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as hdf5 from 'jsfive/dist';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'nn-visualization';

    simple: any;
    cnn: any;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get<Blob>("/assets/models/simple.h5", {responseType: 'blob' as 'json'})
            .subscribe(async blob => {
                const buffer = await blob.arrayBuffer();
                const file = new hdf5.File(buffer);
                const temp = {...file};
                delete temp.file;
                delete temp.parent;
                temp.keys = file.keys;
                temp.attrs = file.attrs;
                temp.attrs.model_config = JSON.parse(temp.attrs.model_config);
                temp.attrs.training_config = JSON.parse(temp.attrs.training_config);
                this.simple = JSON.parse(JSON.stringify(temp));
            });

        this.http.get<Blob>("/assets/models/cnn.h5", {responseType: 'blob' as 'json'})
            .subscribe(async blob => {
                const buffer = await blob.arrayBuffer();
                const file = new hdf5.File(buffer);
                const temp = {...file};
                delete temp.file;
                delete temp.parent;
                temp.keys = file.keys;
                temp.attrs = file.attrs;
                temp.attrs.model_config = JSON.parse(temp.attrs.model_config);
                temp.attrs.training_config = JSON.parse(temp.attrs.training_config);
                this.cnn = JSON.parse(JSON.stringify(temp));
            });
    }
}
