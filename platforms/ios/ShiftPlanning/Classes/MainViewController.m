/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  MainViewController.h
//  shiftplanningapp
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "MainViewController.h"
static NSString* appIndexFile;
static NSString* appSSOWithToken;
static bool shouldLoadSSOResult = false;

@implementation MainViewController

- (id)initWithNibName:(NSString*)nibNameOrNil bundle:(NSBundle*)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Uncomment to override the CDVCommandDelegateImpl used
        // _commandDelegate = [[MainCommandDelegate alloc] initWithViewController:self];
        // Uncomment to override the CDVCommandQueue used
        // _commandQueue = [[MainCommandQueue alloc] initWithViewController:self];
    }
    return self;
}

- (id)init
{
    self = [super init];
    if (self) {
        // Uncomment to override the CDVCommandDelegateImpl used
        // _commandDelegate = [[MainCommandDelegate alloc] initWithViewController:self];
        // Uncomment to override the CDVCommandQueue used
        // _commandQueue = [[MainCommandQueue alloc] initWithViewController:self];
    }
    return self;
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];

    // Release any cached data, images, etc that aren't in use.
}

#pragma mark View lifecycle

- (void)viewWillAppear:(BOOL)animated
{
    // View defaults to full size.  If you want to customize the view's size, or its subviews (e.g. webView),
    // you can do so here.

    [super viewWillAppear:animated];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return [super shouldAutorotateToInterfaceOrientation:interfaceOrientation];
}

/* Comment out the block below to over-ride */

/*
- (UIWebView*) newCordovaViewWithFrame:(CGRect)bounds
{
    return[super newCordovaViewWithFrame:bounds];
}
*/

#pragma mark UIWebDelegate implementation

- (void)webViewDidFinishLoad:(UIWebView*)theWebView
{
    // Black base color for background matches the native apps
    theWebView.backgroundColor = [UIColor blackColor];

    return [super webViewDidFinishLoad:theWebView];
}


- (void) webViewDidStartLoad:(UIWebView*)theWebView 
{
	if( shouldLoadSSOResult == true ){
		shouldLoadSSOResult = false;
    	[theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:appSSOWithToken]] ];
	}
	return [super webViewDidStartLoad:theWebView];
}

- (BOOL)webView:(UIWebView *)theWebView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
	// Modify the user-agent
	NSString* suffixUA = @" PhoneGap";
	UIWebView* webView = [[UIWebView alloc] initWithFrame:CGRectZero]; 
	NSString* defaultUA = [webView stringByEvaluatingJavaScriptFromString:@"navigator.userAgent"];
	NSString* finalUA = [defaultUA stringByAppendingString:suffixUA];
	NSDictionary *dictionary = [NSDictionary dictionaryWithObjectsAndKeys:finalUA, @"UserAgent", nil];
	[[NSUserDefaults standardUserDefaults] registerDefaults:dictionary];
	
    NSURL *url = [request URL];
	NSURLRequest* req = request;
	NSRange isAppIndexFile = [[url absoluteString] rangeOfString:@"file:///var/mobile" options:NSCaseInsensitiveSearch];
	NSRange isAppIndexFileiOS7p = [[url absoluteString] rangeOfString:@"var/mobile/Containers" options:NSCaseInsensitiveSearch];
	NSRange gotToken = [[url absoluteString] rangeOfString:@"__token" options:NSCaseInsensitiveSearch];
	NSRange isFiles = [[url absoluteString] rangeOfString:@"admin.file" options:NSCaseInsensitiveSearch];
	NSRange triesToOpenDesk = [[url absoluteString] rangeOfString:@"shiftplanning.com/app/" options:NSCaseInsensitiveSearch];
	NSRange triesToOpenDesk2 = [[url absoluteString] rangeOfString:@"www.shiftplanning.com/" options:NSCaseInsensitiveSearch];
	NSRange isLogout = [[url absoluteString] rangeOfString:@"#logout" options:NSCaseInsensitiveSearch];
	NSRange isTrusty = [[url absoluteString] rangeOfString:@"privacy-policy.truste.com" options:NSCaseInsensitiveSearch];
	
	if( isLogout.location != NSNotFound ){
		NSLog(@"LOGOUT detected, appSSOWithToken will be empty string");
		appSSOWithToken = @"";
		shouldLoadSSOResult = false;
	}
	
    if ( isTrusty.location != NSNotFound ) {
        [[UIApplication sharedApplication] openURL:url];
        return NO;
    }
	
    if ( isFiles.location != NSNotFound ) {
        [[UIApplication sharedApplication] openURL:url];
        return NO;
    }
	
	if( isAppIndexFile.location != NSNotFound || isAppIndexFileiOS7p.location != NSNotFound ){
		appIndexFile = [[url absoluteString] copy];
	}
	
    if ( triesToOpenDesk.location != NSNotFound || triesToOpenDesk2.location != NSNotFound || gotToken.location != NSNotFound ) {
		NSLog(@"in with ");
		NSLog([url absoluteString]);
		if( triesToOpenDesk.location != NSNotFound || triesToOpenDesk2.location != NSNotFound ){
			NSLog(@"in DESK and its going to cancel this request ");
			return NO;
		}
		NSLog(@"After DESK and it should be OK, appSSOWithToken is NEXT:");
		NSLog(appSSOWithToken);
		if( gotToken.location != NSNotFound  && ( appSSOWithToken.length == 0 || appSSOWithToken == nil ) ){
			NSLog(@"After DESK, it HAS TOKEN and it should be OK ");
			NSURL* blankurl = [NSURL fileURLWithPath:appIndexFile];
			NSString *part = [[url absoluteString] substringWithRange: NSMakeRange(gotToken.location, [url absoluteString].length - gotToken.location)];
			NSString* token = [NSString stringWithFormat:@"%@#%@",appIndexFile, part];
			token = [token stringByReplacingOccurrencesOfString:@"#logout"
                                     withString:@""];
			token = [token stringByReplacingOccurrencesOfString:@"#login"
                                     withString:@""];
			appSSOWithToken = [token copy];
			shouldLoadSSOResult = true;
			NSLog(@"THE NEW appSSOWithToken is:");
			NSLog(appSSOWithToken);
			NSLog(@"THE NEW token is:");
			NSLog(token);
			req = [NSURLRequest requestWithURL:[NSURL URLWithString:token]];
			return [ super webView:theWebView shouldStartLoadWithRequest:req navigationType:navigationType ];
		}
		return [ super webView:theWebView shouldStartLoadWithRequest:req navigationType:navigationType ];
    }
	return [ super webView:theWebView shouldStartLoadWithRequest:req navigationType:navigationType ];
}

/* Comment out the block below to over-ride */

/*

- (void) webViewDidStartLoad:(UIWebView*)theWebView
{
    return [super webViewDidStartLoad:theWebView];
}

- (void) webView:(UIWebView*)theWebView didFailLoadWithError:(NSError*)error
{
    return [super webView:theWebView didFailLoadWithError:error];
}

- (BOOL) webView:(UIWebView*)theWebView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType
{
    return [super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType];
}
*/

@end

@implementation MainCommandDelegate

/* To override the methods, uncomment the line in the init function(s)
   in MainViewController.m
 */

#pragma mark CDVCommandDelegate implementation

- (id)getCommandInstance:(NSString*)className
{
    return [super getCommandInstance:className];
}

- (NSString*)pathForResource:(NSString*)resourcepath
{
    return [super pathForResource:resourcepath];
}

@end

@implementation MainCommandQueue

/* To override, uncomment the line in the init function(s)
   in MainViewController.m
 */
- (BOOL)execute:(CDVInvokedUrlCommand*)command
{
    return [super execute:command];
}

@end
