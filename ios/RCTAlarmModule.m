//
//  RCTAlarmModule.m
//  SSMA
//
//  Created by Singh Siddharth on 04/01/23.
//
//#import <Foundation/Foundation.h>
// RCTAlarmModule.m

#import "RCTAlarmModule.h"
#import <React/RCTLog.h>
@implementation RCTAlarmModule

// To export a module named RCTAlarmModule
// Without passing in a name this will export the native module name as the Objective-C class name with “RCT” removed
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(createAlarmEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
@end
