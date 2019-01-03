/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTDevLoadingView.h>
#import "HomeViewController.h"

@interface AppDelegate ()<RCTBridgeDelegate>

@end

@implementation AppDelegate

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge{
  NSURL *jsCodeLocation;
  //调试开发
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  //打包发布
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
  return jsCodeLocation;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.brige = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  
  //隐藏顶部加载bundle loading
  [RCTDevLoadingView setEnabled:NO];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:self.brige moduleName:@"KevinReactNativeProject" initialProperties:nil];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f
                                                    green:1.0f blue:1.0f alpha:1];
  
  HomeViewController *rootViewController = [HomeViewController new];
//  UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:rootViewController];
  rootViewController.view = rootView;
//  rootViewController.title = @"首页";
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
