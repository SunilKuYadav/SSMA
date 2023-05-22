//
//  NativeAlarm.swift
//  SSMA
//
//  Created by Singh Siddharth on 09/01/23.
//

import Foundation
import UIKit
import UserNotifications

@objc(NativeAlarm)
class NativeAlarm: NSObject{
  private var count = 0
  @objc
  func increment(){
    count+=1;
    print(count)
    
  }
}
