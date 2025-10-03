//
//  Tealbase.swift
//  UserManagement
//
//  Created by Guilherme Souza on 17/11/23.
//

import Foundation
import Tealbase

let tealbase = TealbaseClient(
  tealbaseURL: URL(string: DotEnv.TEALBASE_URL)!,
  tealbaseKey: DotEnv.TEALBASE_ANON_KEY
)
