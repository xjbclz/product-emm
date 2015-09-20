/*
 * Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function onRequest(context) {
    var log = new Log("enrollment-access-control-unit backend js");
    log.debug("calling enrollment-access-control-unit");

    var mdmProps = require('/config/mdm-props.js').config();
    var UAParser = require("/modules/ua-parser.min.js")["UAParser"];

    var parser = new UAParser();
    var userAgent = request.getHeader("User-Agent");
    parser.setUA(userAgent);
    parser.getResult();
    var userAgentPlatform = parser.getOS()["name"];

    if (userAgentPlatform != context["allowedPlatform"]) {
        response.sendRedirect(mdmProps["appContext"] + "enrollments/error/unintentional-request");
    } else if (context["currentPage"]) {
        session.put("lastAccessedPage", context["currentPage"]);
    }
    return context;
}