//
//  HomeViewController.m
//  KevinReactNativeProject
//
//  Created by kaiwei Xu on 2018/10/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "HomeViewController.h"
#import "MovieListController.h"
#import <React/RCTBridgeModule.h>

@interface HomeViewController ()<RCTBridgeModule>

@end

@implementation HomeViewController

RCT_EXPORT_MODULE();

- (void)viewDidLoad {
    [super viewDidLoad];
    
}

RCT_EXPORT_METHOD (jumpToMovieList:(NSString *)name age:(NSInteger)age) {
  NSLog(@"name:%@----age:%@",name,@(age));
  dispatch_async(dispatch_get_main_queue(), ^{
    MovieListController *movieList = [[MovieListController alloc] init];
    movieList.hidesBottomBarWhenPushed = YES;
    UIWindow *window = [UIApplication sharedApplication].delegate.window;
    UINavigationController *nav = (UINavigationController *)window.rootViewController;
    [nav pushViewController:movieList animated:YES];
  });
  
}

@end
