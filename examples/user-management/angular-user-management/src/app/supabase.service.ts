import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  TealbaseClient,
  User,
} from '@tealbase/tealbase-js';
import { environment } from 'src/environments/environment';
import { Database } from 'src/schema';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class TealbaseService {
  private tealbase: TealbaseClient<Database>;
  _session: AuthSession | null = null;

  constructor() {
    this.tealbase = createClient<Database>(
      environment.tealbaseUrl,
      environment.tealbaseKey
    );
  }

  get session() {
    this.tealbase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.tealbase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.tealbase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.tealbase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.tealbase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.tealbase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.tealbase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.tealbase.storage.from('avatars').upload(filePath, file);
  }
}
