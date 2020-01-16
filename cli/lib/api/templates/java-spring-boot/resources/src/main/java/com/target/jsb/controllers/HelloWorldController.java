package com.target.jsb.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class HelloWorldController {

  static final String VERSION_API_URL = "http://services/version_api/";

  @GetMapping("hello")
  String hello() throws Exception {
    return "Hello world: " + makeSampleApiCall();
  }

  private String makeSampleApiCall() throws IOException {
    Gson gson = new Gson();
    String result = readUrl(VERSION_API_URL);
    JsonObject body = gson.fromJson(result, JsonObject.class);
    String version = body.get("version").getAsString();
    return version;
  }

  private static String readUrl(String urlString) throws IOException {
    BufferedReader reader = null;
    try {
      URL url = new URL(urlString);
      reader = new BufferedReader(new InputStreamReader(url.openStream()));
      StringBuffer buffer = new StringBuffer();
      int read;
      char[] chars = new char[1024];
      while ((read = reader.read(chars)) != -1)
        buffer.append(chars, 0, read);

      return buffer.toString();
    } finally {
      if (reader != null)
        reader.close();
    }
  }

}
