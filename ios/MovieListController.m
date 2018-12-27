//
//  MovieListController.m
//  KevinReactNativeProject
//
//  Created by kaiwei Xu on 2018/10/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "MovieListController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "AppDelegate.h"

@interface MovieListController ()

@end

@implementation MovieListController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"电影";
    self.view.backgroundColor = [UIColor whiteColor];
  
  AppDelegate *app = (AppDelegate *)[UIApplication sharedApplication].delegate;
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:app.brige moduleName:@"MovieList" initialProperties:nil];
  
  self.view = rootView;
  
}

@end
