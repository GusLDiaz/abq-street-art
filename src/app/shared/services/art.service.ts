import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Art} from "../classes/art";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Point} from "../classes/point";

@Injectable()
export class ArtService {
	protected artSubject : BehaviorSubject<Art[]> = new BehaviorSubject<Art[]>([]);
	public artObserver : Observable<Art[]> = this.artSubject.asObservable();

	constructor(protected http: HttpClient) {
		this.getAllArts().subscribe(arts => this.artSubject.next(arts));
	}

	//define the API endpoint
	private artUrl = "api/art/";

// call to the Art API and get an Art object by its id
	getArtByArtId(id: string): Observable<Art> {
		return (this.http.get<Art>(this.artUrl + id));
	}

// call to the Art API and get an Art object by its distance
	getArtByDistance(distance: string): Observable<Art[]> {
		return (this.http.get<Art[]>(this.artUrl, {params: new HttpParams().set("distance", distance)}));
	}

// call to the Art API and get an Art object by its type
	getArtByArtType(artType: string): Observable<Art[]> {
		return (this.http.get<Art[]>(this.artUrl, {params: new HttpParams().set("artType", artType)}));
	}

// call to the Art API and get an Art object by its type
	getAllArts(): Observable<Art[]> {
		return (this.http.get<Art[]>(this.artUrl));
	}

    //call to the API and get an array of all the arts in the database
	//TODO wtf is happening? i copied this and changed some things and it's wrong and whatever.
    getArtPoints() : Observable<Point[]> {

		//TODO what should we be returning??????
        return(this.http.get<Point[]>(this.artUrl, {params: new HttpParams().set("artPoint", "yes")}));

    }

}